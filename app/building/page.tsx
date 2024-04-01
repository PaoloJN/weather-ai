import { BotCard, BotMessage } from '@/components/llm-stocks'
import AirQuality from '@/components/llm-weather/air-quality'
import { UserMessage } from '@/components/llm-weather/message'
import WeatherAtmosphericConditions from '@/components/llm-weather/weather-atmospheric-condition'
import CurrentWeatherSummary from '@/components/llm-weather/weather-temperature'
import WeatherDaysForecast from '@/components/llm-weather/weather-daily-forecast'

import {
  hourlyDummy,
  cityDummy,
  tenDayForecastDummy,
  airQualityDummy,
  arrayOfHourlyDummy
} from '@/lib/types'
import WeatherHourForecast from '@/components/llm-weather/weather-hourly-forecast'
import Temperature from '@/components/llm-weather/weather-temperature'

export default function Page() {
  return (
    <>
      <div className="pb-[200px] pt-4 md:pt-10">
        <div className="relative mx-auto max-w-2xl px-4">
          <div className="pb-8">
            <UserMessage>
              <p>
                I want to know the weather in {cityDummy.name} today. Can you
                help me with that?
              </p>
            </UserMessage>
          </div>
          {/* <div className="pb-8">
            <BotMessage className="mb-3">
              The weather in {cityDummy.name} is currently{' '}
              {hourlyDummy.weather[0].description} with a temperature of{' '}
              {Math.round(hourlyDummy.main.temp)}&deg;. Which is not a good day
              to take a ride on your bike.
            </BotMessage>
            <BotCard showAvatar={false}>
              <WeatherAtmosphericConditions
                data={hourlyDummy}
                city={cityDummy}
              />
            </BotCard>
          </div> */}
          {/* <div className="pb-8">
            <UserMessage>
              <p>
                I want to know the weather in {cityDummy.name} today. Can you
                help me with that?
              </p>
            </UserMessage>
          </div>
          <div className="pb-8">
            <BotMessage className="mb-3">
              The weather in {cityDummy.name} is currently{' '}
              {hourlyDummy.weather[0].description} with a temperature of{' '}
              {Math.round(hourlyDummy.main.temp)}&deg;. Which is not a good day
              to take a ride on your bike.
            </BotMessage>
            <BotCard showAvatar={false}>
              <WeatherMap />
            </BotCard>
          </div>
          <div className="pb-8">
            <UserMessage>
              <p>
                I want to know the weather in {cityDummy.name} today. Can you
                help me with that?
              </p>
            </UserMessage>
          </div> */}
          {/* <div className="pb-8">
            <BotMessage className="mb-3">
              The weather in {cityDummy.name} is currently
              {hourlyDummy.weather[0].description} with a temperature of{' '}
              {Math.round(hourlyDummy.main.temp)}&deg;. Which is not a good day
              to take a ride on your bike.
            </BotMessage>
            <BotCard showAvatar={false}>
              <Temperature data={hourlyDummy} />
            </BotCard>
          </div> */}
          {/* <div className="pb-8">
            <BotMessage className="mb-3">
              The weather in {cityDummy.name} is currently{' '}
              {hourlyDummy.weather[0].description} with a temperature of{' '}
              {Math.round(hourlyDummy.main.temp)}&deg;. Which is not a good day
              to take a ride on your bike.
            </BotMessage>
            <BotCard showAvatar={false}>
              <AirQuality data={airQualityDummy} />
            </BotCard>
          </div> */}
          {/* <div className="pb-8">
            <BotMessage className="mb-3">
              The weather in {cityDummy.name} is currently{' '}
              {hourlyDummy.weather[0].description} with a temperature of{' '}
              {Math.round(hourlyDummy.main.temp)}&deg;. Which is not a good day
              to take a ride on your bike.
            </BotMessage>
            <BotCard showAvatar={false}>
              <WeatherDaysForecast data={tenDayForecastDummy} />
            </BotCard>
          </div> */}
        </div>
      </div>
    </>
  )
}
