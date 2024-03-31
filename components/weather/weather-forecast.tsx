import { formatSunTimeWithAMPM } from '@/lib/utils/date'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import Compass from '@/components/ui/compass'
import { City, HourlyForecastData } from '@/lib/types'

interface WeatherAtmosphericConditionsProps {
  data: HourlyForecastData
  city: City
}
export default function WeatherAtmosphericConditions({
  data,
  city
}: WeatherAtmosphericConditionsProps) {
  return (
    <>
      <Card className="order-10 flex h-48 flex-col justify-between">
        <CardHeader>
          <CardTitle>
            <i>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="m12 14 4-4" />
                <path d="M3.34 19a10 10 0 1 1 17.32 0" />
              </svg>
            </i>
            Pressure
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>{data.main.pressure} hPa</p>
        </CardContent>
        <CardFooter>
          <p>
            {data.main.pressure < 1000
              ? 'Low pressure. Expect changes in the weather.'
              : data.main.pressure >= 1000 && data.main.pressure <= 1010
                ? 'Normal pressure. Typical weather conditions.'
                : 'High pressure. Expect stable and clear weather.'}
          </p>
        </CardFooter>
      </Card>
      <Card className="order-3 flex h-48 flex-col justify-between lg:order-2">
        <CardHeader>
          <CardTitle>
            <i>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 invert dark:invert-0"
              >
                <path
                  d="M18.4802 12.25C18.7602 12.25 19.0002 12.01 18.9802 11.73C18.7102 8.11 15.6902 5.25 12.0002 5.25C8.31019 5.25 5.29021 8.1 5.02021 11.73C5.00021 12.01 5.24021 12.25 5.52021 12.25H18.4802Z"
                  fill="white"
                />
                <path
                  d="M22 13H21.92C21.37 13 20.92 12.55 20.92 12C20.92 11.45 21.37 11 21.92 11C22.47 11 22.96 11.45 22.96 12C22.96 12.55 22.55 13 22 13ZM2.08002 13H2C1.45 13 1 12.55 1 12C1 11.45 1.45 11 2 11C2.55 11 3.03998 11.45 3.03998 12C3.03998 12.55 2.63002 13 2.08002 13ZM19.01 5.99001C18.75 5.99001 18.5 5.89 18.3 5.7C17.91 5.31 17.91 4.67999 18.3 4.28999L18.43 4.16C18.82 3.77 19.45 3.77 19.84 4.16C20.23 4.55 20.23 5.18001 19.84 5.57001L19.71 5.7C19.52 5.89 19.27 5.99001 19.01 5.99001ZM4.98999 5.99001C4.72999 5.99001 4.48003 5.89 4.28003 5.7L4.15002 5.57001C3.76002 5.18001 3.76002 4.55 4.15002 4.16C4.54002 3.77 5.17 3.77 5.56 4.16L5.69 4.28999C6.08 4.67999 6.08 5.31 5.69 5.7C5.5 5.89 5.23999 5.99001 4.98999 5.99001ZM12 3.03999C11.45 3.03999 11 2.63 11 2.08V2C11 1.45 11.45 1 12 1C12.55 1 13 1.45 13 2C13 2.55 12.55 3.03999 12 3.03999Z"
                  fill="white"
                />
                <path
                  opacity="0.4"
                  d="M20 15.75H4C3.59 15.75 3.25 15.41 3.25 15C3.25 14.59 3.59 14.25 4 14.25H20C20.41 14.25 20.75 14.59 20.75 15C20.75 15.41 20.41 15.75 20 15.75Z"
                  fill="white"
                />
                <path
                  opacity="0.4"
                  d="M18 18.75H6C5.59 18.75 5.25 18.41 5.25 18C5.25 17.59 5.59 17.25 6 17.25H18C18.41 17.25 18.75 17.59 18.75 18C18.75 18.41 18.41 18.75 18 18.75Z"
                  fill="white"
                />
                <path
                  opacity="0.4"
                  d="M15 21.75H9C8.59 21.75 8.25 21.41 8.25 21C8.25 20.59 8.59 20.25 9 20.25H15C15.41 20.25 15.75 20.59 15.75 21C15.75 21.41 15.41 21.75 15 21.75Z"
                  fill="white"
                />
              </svg>
            </i>
            Sunset
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>{formatSunTimeWithAMPM(city.sunset, city.timezone)}</p>
        </CardContent>
        <CardFooter>
          <p>Sunrise: {formatSunTimeWithAMPM(city.sunrise, city.timezone)}</p>
        </CardFooter>
      </Card>
      <Card className="order-4 h-48 xl:order-3">
        <CardHeader>
          <CardTitle>
            <i>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 stroke-black dark:stroke-white"
              >
                <path
                  d="M2 15H18.5C20.43 15 22 16.57 22 18.5C22 20.43 20.43 22 18.5 22C16.57 22 15 20.43 15 18.5V18"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  opacity="0.4"
                  d="M2 12H18.5C20.42 12 22 10.43 22 8.5C22 6.58 20.42 5 18.5 5C16.58 5 15 6.57 15 8.5V9"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 9.00012H9.31C10.8 9.00012 12 7.79012 12 6.31012C12 4.82012 10.79 3.62012 9.31 3.62012C7.82 3.62012 6.62 4.83012 6.62 6.31012V6.69012"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </i>
            Wind
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center p-0">
          <Compass speed={data.wind.speed} deg={data.wind.deg} />
        </CardContent>
      </Card>
      <Card className="order-6 flex h-48 flex-col justify-between">
        <CardHeader>
          <CardTitle>
            <i>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 invert dark:invert-0"
              >
                <path
                  d="M16.6102 19.9999C17.9502 20.0099 19.2402 19.5099 20.2302 18.6099C23.5002 15.7499 21.7502 10.0099 17.4402 9.46995C15.9002 0.129949 2.43022 3.66995 5.62022 12.5599"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.27986 12.9698C6.74986 12.6998 6.15986 12.5598 5.56986 12.5698C0.909864 12.8998 0.919864 19.6798 5.56986 20.0098"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.8198 9.88998C16.3398 9.62998 16.8998 9.48998 17.4798 9.47998"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  opacity="0.4"
                  d="M9.97022 20L7.97021 22"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  opacity="0.4"
                  d="M13.9702 20L11.9702 22"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  opacity="0.4"
                  d="M13.9702 16L11.9702 18"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  opacity="0.4"
                  d="M9.97022 16L7.97021 18"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </i>
            Precipitation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            {data.rain?.['1h'] || 0}mm <br></br>in the last 3h
          </p>
        </CardContent>
        <CardFooter>
          <p>
            {data.rain?.['1h'] !== undefined
              ? data.rain['1h'] <= 0.2
                ? 'Light rain or drizzle. An umbrella may come in handy.'
                : data.rain['1h'] <= 2.5
                  ? 'Moderate rain.'
                  : 'Heavy rain.'
              : 'Conditions are dry.'}
          </p>
        </CardFooter>
      </Card>
    </>
  )
}
