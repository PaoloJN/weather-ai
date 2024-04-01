import { formatSunTimeWithAMPM } from '@/lib/utils/date'
import Compass from '@/components/ui/compass'
import { City, HourlyForecastData } from '@/lib/types'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

// Atmospheric Conditions Panel: This combined component would display key weather metrics including precipitation, atmospheric pressure, and wind details. It indicates that there has been no precipitation in the last 3 hours, the atmospheric pressure is at 999 hPa suggesting an increased likelihood of weather changes, and there's a gentle wind from the south at a speed of 2 meters per second.

interface WeatherAtmosphericConditionsProps {
  data: HourlyForecastData
  city: City
}
export default function WeatherAtmosphericConditions({
  data,
  city
}: WeatherAtmosphericConditionsProps) {
  return (
    <div className="flex flex-row space-x-2">
      <Card className="flex h-48 flex-col justify-between w-full md:p-4">
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
      <Card className="h-48 w-full md:p-4">
        <CardHeader>
          <CardTitle>
            <div className="h-4 w-4 ">
              <i>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
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
            </div>
            Wind
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center p-1">
          <Compass speed={data.wind.speed} deg={data.wind.deg} />
        </CardContent>
      </Card>
      <Card className="flex h-48 flex-col justify-between w-full md:p-4">
        <CardHeader>
          <CardTitle>
            <i>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                className="h-4 w-4 int"
              >
                <path
                  d="M16.6102 19.9999C17.9502 20.0099 19.2402 19.5099 20.2302 18.6099C23.5002 15.7499 21.7502 10.0099 17.4402 9.46995C15.9002 0.129949 2.43022 3.66995 5.62022 12.5599"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.27986 12.9698C6.74986 12.6998 6.15986 12.5598 5.56986 12.5698C0.909864 12.8998 0.919864 19.6798 5.56986 20.0098"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.8198 9.88998C16.3398 9.62998 16.8998 9.48998 17.4798 9.47998"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  opacity="0.4"
                  d="M9.97022 20L7.97021 22"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  opacity="0.4"
                  d="M13.9702 20L11.9702 22"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  opacity="0.4"
                  d="M13.9702 16L11.9702 18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  opacity="0.4"
                  d="M9.97022 16L7.97021 18"
                  stroke="currentColor"
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
    </div>
  )
}
