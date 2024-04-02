'use client'

import { HourlyForecastData } from '@/lib/types'
import { Card } from '@/components/ui/card'
import IconComponent from '@/components/ui/icon-component'

interface HourlyForecastProps {
  data: HourlyForecastData[]
}

export function HourlyForecast({ data }: HourlyForecastProps) {
  // show hour in 12-hour format and use am/pm
  function extractHoursFromDate(dt: number): string {
    const date = new Date(dt * 1000)
    let hours = date.getHours()
    const ampm = hours >= 12 ? 'pm' : 'am'
    hours = hours % 12
    hours = hours ? hours : 12 // the hour '0' should be '12'
    return hours + '.00 ' + ampm
  }

  return (
    // <div className="w-full overflow-x-auto">
    <Card className="flex h-48 overflow-x-scroll w-[39.5rem]">
      {data.slice(0, 12).map((item: HourlyForecastData, i) => (
        <div
          key={item.dt}
          className="flex h-full min-w-[100px] flex-col justify-between"
        >
          <div className="flex justify-center text-sm text-neutral-600 dark:text-neutral-400">
            {i === 0 ? 'Now' : extractHoursFromDate(item.dt)}
          </div>
          <div className="flex h-full items-center justify-center">
            <IconComponent
              weatherCode={item.weather[0].id}
              x={item.sys.pod}
              className="h-8 w-8"
            />
          </div>
          <div className="flex justify-center">
            {Math.floor(item.main.temp)}&deg;
          </div>
        </div>
      ))}
    </Card>
    // </div>
  )
}
