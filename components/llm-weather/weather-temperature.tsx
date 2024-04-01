'use client'

import { HourlyForecastResponse } from '@/lib/types'
import IconComponent from '@/components/ui/icon-component'
import React from 'react'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

interface TemperatureProps {
  data: HourlyForecastResponse
}

export default function Temperature({ data }: TemperatureProps) {
  if (!data) return <div>Data not found</div>
  return (
    <div className="flex flex-row gap-4 h-full">
      <Card className="flex h-48 w-[65%] flex-col justify-between ">
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
                <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
              </svg>
            </i>
            <span>Temperature</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-1 items-center justify-center">
          <span className="text-md font-normal">{data.city.name}</span>
          <span className="text-2xl">
            {Math.round(data.list[0].main.temp)}&deg;
          </span>
        </CardContent>
        <CardFooter>
          <div className="flex flex-row justify-between w-full">
            <div>
              <div className="font-semibold">
                {data.list[0].weather[0].main}
              </div>
              <div className="flex gap-2 dark:text-neutral-500">
                <span>H: {Math.round(data.list[0].main.temp_max)}&deg;</span>
                <span>L: {Math.round(data.list[0].main.temp_min)}&deg;</span>
              </div>
            </div>
            <IconComponent
              weatherCode={data.list[0].weather[0].id}
              x={data.list[0].sys.pod}
              className="h-9 w-9 mt-2"
            />
          </div>
        </CardFooter>
      </Card>
      <Card className="flex h-48 w-[35%] flex-col justify-between">
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
                <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
              </svg>
            </i>
            Feels like
          </CardTitle>
        </CardHeader>
        <CardContent className="mt-3 flex items-center justify-center">
          <p>{Math.floor(data.list[0].main.feels_like)}&deg;</p>
        </CardContent>
        <CardFooter>
          <p>
            {data.list[0].main.feels_like < data.list[0].main.temp
              ? 'Feels colder than the actual temperature.'
              : data.list[0].main.feels_like > data.list[0].main.temp
                ? 'Feels warmer than the actual temperature.'
                : 'Feels like the actual temperature.'}
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
