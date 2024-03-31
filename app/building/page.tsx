import { BotCard, BotMessage } from '@/components/llm-stocks'
import AirQuality from '@/components/weather/air-quality'
import { UserMessage } from '@/components/weather/message'
import WeatherAtmosphericConditions from '@/components/weather/weather-atmospheric-condition'
import WeatherMap from '@/components/weather/weather-map'
import CurrentWeatherSummary from '@/components/weather/weather-summary'

import {
  hourlyDummy,
  cityDummy,
  tenDayForecastDummy,
  airQualityDummy,
  arrayOfHourlyDummy
} from '@/lib/types'

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
          <div className="pb-8">
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
          </div>
          <div className="pb-8">
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
          </div>
          <div className="pb-8">
            <BotMessage className="mb-3">
              The weather in {cityDummy.name} is currently{' '}
              {hourlyDummy.weather[0].description} with a temperature of{' '}
              {Math.round(hourlyDummy.main.temp)}&deg;. Which is not a good day
              to take a ride on your bike.
            </BotMessage>
            <BotCard showAvatar={false}>
              <CurrentWeatherSummary data={hourlyDummy} city={cityDummy} />
            </BotCard>
          </div>
          <div className="pb-8">
            <BotMessage className="mb-3">
              The weather in {cityDummy.name} is currently{' '}
              {hourlyDummy.weather[0].description} with a temperature of{' '}
              {Math.round(hourlyDummy.main.temp)}&deg;. Which is not a good day
              to take a ride on your bike.
            </BotMessage>
            <BotCard showAvatar={false}>
              {/* <CurrentWeatherSummary data={hourlyDummy} city={cityDummy} /> */}
              <AirQuality data={airQualityDummy} />
            </BotCard>
          </div>
        </div>
      </div>
      {/* <section className="grid h-full grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
          <WeatherWidgets
            data={hourlyDummy}
            city={cityDummy}
            airQuality={airQualityDummy}
            uvIndexForToday={3}
          />
          <HourlyForecast data={arrayOfHourlyDummy} />
          <Map />
          <OtherLargeCities />
        </section> */}
    </>
  )
}
