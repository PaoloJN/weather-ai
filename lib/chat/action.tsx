import 'server-only'

import { z } from 'zod'
import OpenAI from 'openai'
import { runOpenAICompletion } from '@/lib/utils'
import { createAI, createStreamableUI, getMutableAIState } from 'ai/rsc'

// Components
import { WeatherMap } from '@/components/llm-weather/weather-map'
import {
  BotCard,
  BotMessage,
  BotMessageText
} from '@/components/llm-weather/message'
import { spinner } from '@/components/llm-weather/spinner'
import { getDailyForecast, getHourlyData } from '@/app/actions'
import Temperature from '@/components/llm-weather/weather-temperature'
import { DailyForecast } from '@/components/llm-weather/weather-daily-forecast'
import { HourlyForecast } from '@/components/llm-weather/weather-hourly-forecast'

// TODO Create a component to ask user for their location

const SYSTEM_PROMPT = `

THE user current location is *"San Francisco"*

You are a weather chat bot and you can help users check weather conditions, step by step. You and the user can discuss weather forecasts for different locations, if the user doesn't select a city or region assume the user is asking about the weather in their current location (above).

If the user inquires to see a weather map or radar, call \`show_weather_map\` with their specified or assumed location and chosen weather layer based on the context of the conversation (e.g., temperature, rain, wind, clouds, pressure) to display the map.

If the user inquires specifically about the current weather or current temperature or what the temperature feels like, call \`show_weather_temperature\` with the specified or assumed location to display the current temperature and the 'feels like' temperature.

If users inquires in the daily forecast for the next few days, call \`show_daily_forecast\` with the specified or assumed location to display the daily weather forecast. This can help users plan their activities and prepare for the weather ahead.

If the user inquires about the weather later today or the hourly forecast, call \`show_hourly_forecast\` with the specified or assumed location to display the hourly weather forecast. This can help users plan their day and know what to expect hour by hour.

Besides that, you can also chat with users about weather advisories, suggest activities based on the weather, and provide detailed forecasts if needed.`

const HOURLY_SYSTEM_PROMPT = `
You are a weather chat bot and you can help users check weather conditions, step by step. You and the user can discuss weather forecasts for different locations, if the user doesn't select a city or region assume the user is asking about the weather in their current location (above).

The user just asked for the hourly forecast for a specific location. You provided the user with the hourly weather forecast for the next few hours.

Write a short summary of the weather data to display on top of the hourly forecast chat. DON'T RESPOND WITH ANY DATA, JUST WRITE A SUMMARY.

EXAMPLE: "Here's the hourly forecast for the next few hours in [location]. The temperature will be [temperature] and it will feel like [feels like temperature]. There will be [weather condition] with a [percentage] chance of rain.
`

const DAILY_SYSTEM_PROMPT = `
You are a weather chat bot and you can help users check weather conditions, step by step. You and the user can discuss weather forecasts for different locations, if the user doesn't select a city or region assume the user is asking about the weather in their current location (above).

The user just asked for the daily forecast for a specific location. You provided the user with the daily weather forecast for the next few days. DON'T RESPOND WITH ANY DATA, JUST WRITE A SUMMARY.

EXAMPLE: "Here's the daily forecast for the next few days in [location].
`

const WeatherLayer = z.enum([
  'temperature',
  'rain',
  'wind',
  'clouds',
  'pressure'
])

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || '' })

async function submitUserMessage(content: string) {
  'use server'

  const aiState = getMutableAIState<typeof AI>()
  aiState.update([
    ...aiState.get(),
    {
      role: 'user',
      content
    }
  ])

  const reply = createStreamableUI(
    <BotMessage className="items-center">{spinner}</BotMessage>
  )

  const completion = runOpenAICompletion(openai, {
    model: 'gpt-3.5-turbo',
    stream: true,
    temperature: 0,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      ...aiState.get().map((info: any) => ({
        role: info.role,
        content: info.content,
        name: info.name
      }))
    ],
    functions: [
      {
        name: 'show_daily_forecast',
        description:
          'displays the daily weather forecast for a specified location.',
        parameters: z.object({
          lat: z
            .string()
            .describe(
              'The latitude of the location for which the weather map is to be displayed.'
            ),
          lon: z
            .string()
            .describe(
              'The longitude of the location for which the weather map is to be displayed.'
            )
        })
      },
      {
        name: 'show_hourly_forecast',
        description:
          'displays the hourly weather forecast for a specified location.',
        parameters: z.object({
          lat: z
            .string()
            .describe(
              'The latitude of the location for which the weather map is to be displayed.'
            ),
          lon: z
            .string()
            .describe(
              'The longitude of the location for which the weather map is to be displayed.'
            )
        })
      },
      {
        name: 'show_weather_map',
        description:
          'displays a map showing various weather conditions at a specified location. Users can choose to view the map with layers representing different weather metrics such as temperature, rainfall and thunderstorms, wind speed and direction, cloudiness, or atmospheric pressure. The map is interactive, allowing users to zoom in or out to get a more detailed or broader view of the weather conditions',
        parameters: z.object({
          lat: z
            .string()
            .describe(
              'The latitude of the location for which the weather map is to be displayed.'
            ),
          lon: z
            .string()
            .describe(
              'The longitude of the location for which the weather map is to be displayed.'
            ),
          layer: WeatherLayer.describe(
            'The weather metric to be displayed on the map'
          ),
          zoom: z.number().describe('The zoom level of the map')
        })
      },
      {
        name: 'show_weather_temperature',
        description:
          'displays the current temperature and what it feels like at a specified location.',
        parameters: z.object({
          lat: z
            .string()
            .describe(
              'The latitude of the location for which the weather map is to be displayed.'
            ),
          lon: z
            .string()
            .describe(
              'The longitude of the location for which the weather map is to be displayed.'
            )
        })
      }
    ]
  })

  completion.onTextContent((content: string, isFinal: boolean) => {
    reply.update(<BotMessageText content={content} />)
    if (isFinal) {
      reply.done()
      aiState.done([...aiState.get(), { role: 'assistant', content }])
    }
  })

  completion.onFunctionCall(
    'show_weather_map',
    async ({ lat, lon, layer, zoom }) => {
      const messages: any = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...aiState.get().map((info: any) => ({
          role: info.role,
          content: info.content,
          name: info.name
        })),
        {
          role: 'function',
          name: 'show_weather_map',
          content: JSON.stringify({ lat, lon, layer, zoom })
        }
      ]

      console.log('mess', messages)

      const stream = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        stream: true,
        messages: messages
      })

      let content = ''
      for await (const chunk of stream) {
        content += chunk.choices[0]?.delta?.content || ''
        // reply.update(<BotMessage>{content}</BotMessage>)
        reply.update(<BotMessageText content={content} />)
      }

      reply.done(
        <div>
          {/* <BotMessage className="mb-3">{content}</BotMessage> */}
          <BotMessageText content={content} />
          <BotCard showAvatar={false}>
            <WeatherMap
              latitude={lat}
              longitude={lon}
              layer={layer}
              zoom={zoom}
            />
          </BotCard>
        </div>
      )

      aiState.done([
        ...aiState.get(),
        {
          role: 'function',
          name: 'show_weather_map',
          content: JSON.stringify({ message: content, lat, lon, layer, zoom })
        }
      ])
    }
  )

  completion.onFunctionCall('show_daily_forecast', async ({ lat, lon }) => {
    const data = await getDailyForecast({
      latitude: lat,
      longitude: lon
    })

    const messages: any = [
      { role: 'system', content: DAILY_SYSTEM_PROMPT },
      ...aiState.get().map((info: any) => ({
        role: info.role,
        content: info.content,
        name: info.name
      })),
      {
        role: 'function',
        name: 'show_daily_forecast',
        content: JSON.stringify({ data })
      }
    ]

    const stream = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages: messages
    })

    let content = ''
    for await (const chunk of stream) {
      content += chunk.choices[0]?.delta?.content || ''
      reply.update(<BotMessageText content={content} />)
    }

    reply.done(
      <div>
        {/* <BotMessage className="mb-3">{content}</BotMessage> */}
        <BotMessageText content={content} />
        <BotCard showAvatar={false}>
          <DailyForecast className="" data={data} />
        </BotCard>
      </div>
    )

    aiState.done([
      ...aiState.get(),
      {
        role: 'function',
        name: 'show_daily_forecast',
        content: JSON.stringify({ message: content, data })
      }
    ])
  })

  completion.onFunctionCall('show_hourly_forecast', async ({ lat, lon }) => {
    const data = await getHourlyData({
      latitude: lat,
      longitude: lon
    })

    const messages: any = [
      { role: 'system', content: HOURLY_SYSTEM_PROMPT },
      ...aiState.get().map((info: any) => ({
        role: info.role,
        content: info.content,
        name: info.name
      })),
      {
        role: 'function',
        name: 'show_hourly_forecast',
        content: JSON.stringify({ data })
      }
    ]

    const stream = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages: messages
    })

    let content = ''
    for await (const chunk of stream) {
      content += chunk.choices[0]?.delta?.content || ''
      reply.update(<BotMessageText content={content} />)
    }

    reply.done(
      <div>
        {/* <BotMessage className="mb-3">{content}</BotMessage> */}
        <BotMessageText content={content} />
        <BotCard showAvatar={false}>
          <HourlyForecast data={data.list} />
        </BotCard>
      </div>
    )

    aiState.done([
      ...aiState.get(),
      {
        role: 'function',
        name: 'show_hourly_forecast',
        content: JSON.stringify({ message: content, data })
      }
    ])
  })

  completion.onFunctionCall(
    'show_weather_temperature',
    async ({ lat, lon }) => {
      // console.log('cord', { lat, lon })

      const data = await getHourlyData({
        latitude: lat,
        longitude: lon
      })

      // console.log('getHourlyData Data from actions', data)

      const messages: any = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...aiState.get().map((info: any) => ({
          role: info.role,
          content: info.content,
          name: info.name
        })),
        {
          role: 'function',
          name: 'show_weather_temperature',
          content: JSON.stringify({
            data: data.list[0],
            city: data.city
          })
        }
      ]

      const stream = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        stream: true,
        messages: messages
      })

      reply.update(<BotMessage className="items-center">{spinner}</BotMessage>)

      let content = ''
      for await (const chunk of stream) {
        content += chunk.choices[0]?.delta?.content || ''
        reply.update(<BotMessage>{content}</BotMessage>)
      }

      reply.done(
        <div>
          <BotMessage className="mb-3">{content}</BotMessage>
          <BotCard showAvatar={false}>
            <Temperature data={data} />
          </BotCard>
        </div>
      )

      aiState.done([
        ...aiState.get(),
        {
          role: 'function',
          name: 'show_weather_temperature',
          content: JSON.stringify({
            message: content,
            data: data.list[0],
            city: data.city
          })
        }
      ])
    }
  )

  return {
    id: Date.now(),
    display: reply.value
  }
}

const initialAIState: {
  role: 'user' | 'assistant' | 'system' | 'function'
  content: string
  id?: string
  name?: string
}[] = []

const initialUIState: {
  id: number
  display: React.ReactNode
}[] = []

export const AI = createAI({
  actions: {
    submitUserMessage
  },
  initialUIState,
  initialAIState
})
