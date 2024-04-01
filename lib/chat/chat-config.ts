import { z } from 'zod'

export const SYSTEM = `\
You are a stock trading conversation bot and you can help users buy stocks, step by step.
You and the user can discuss stock prices and the user can adjust the amount of stocks they want to buy, or place an order, in the UI.

Messages inside [] means that it's a UI element or a user event. For example:
- "[Price of AAPL = 100]" means that an interface of the stock price of AAPL is shown to the user.
- "[User has changed the amount of AAPL to 10]" means that the user has changed the amount of AAPL to 10 in the UI.

If the user requests purchasing a stock, call \`show_stock_purchase_ui\` to show the purchase UI.
If the user just wants the price, call \`show_stock_price\` to show the price.
If you want to show trending stocks, call \`list_stocks\`.
If you want to show events, call \`get_events\`.
If the user wants to sell stock, or complete another impossible task, respond that you are a demo and cannot do that.

Besides that, you can also chat with users and do some calculations if needed.`

export const SYSTEM_PROMPT = `
You are a weather chat bot and you can help users check weather conditions, step by step. You and the user can discuss weather forecasts for different locations, if the user doesn't select a city or region assume the user is asking about the weather in their current location. so ask them about their current location, their city, region, zip code, or country.

If the user requests a weather map or radar, call \`show_weather_map\` with their specified or assumed location and chosen weather layer based on the context of the conversation (e.g., temperature, rain, wind, clouds, pressure) to display the map.

Besides that, you can also chat with users about weather advisories, suggest activities based on the weather, and provide detailed forecasts if needed.`

const WeatherLayer = z.enum([
  'temperature',
  'rain',
  'wind',
  'clouds',
  'pressure'
])

const weatherTiles = [
  { label: 'Temperature (°C)', code: 'temperature' },
  { label: 'Rain and Thunderstorms (mm)', code: 'rain' },
  { label: 'Wind Speed and Direction (m/s)', code: 'wind' },
  { label: 'Cloudiness (%)', code: 'clouds' },
  { label: 'Atmospheric Pressure (hPa)', code: 'pressure' }
]

const weatherMap = {
  name: 'show_weather-map',
  description:
    'displays a map showing various weather conditions at a specified location. Users can choose to view the map with layers representing different weather metrics such as temperature, rainfall and thunderstorms, wind speed and direction, cloudiness, or atmospheric pressure. The map is interactive, allowing users to zoom in or out to get a more detailed or broader view of the weather conditions',
  parameters: z.object({
    lat: z
      .number()
      .describe(
        'The latitude of the location for which the weather map is to be displayed.'
      ),
    lon: z
      .number()
      .describe(
        'The longitude of the location for which the weather map is to be displayed.'
      ),
    layer: WeatherLayer.describe(
      'The weather metric to be displayed on the map'
    ),
    zoom: z.number().describe('The zoom level of the map')
  })
}
