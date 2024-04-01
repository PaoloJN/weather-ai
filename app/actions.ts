import { HourlyForecastResponse } from '@/lib/types'

interface coordinates {
  latitude: string
  longitude: string
}

const API_KEY = process.env.OPEN_WEATHER_API_KEY

export async function getUVData({ latitude, longitude }: coordinates) {
  const data = await fetch(
    `${process.env.VERCEL_URL}/api/weather/uv_index?lat=${latitude}&lon=${longitude}`
  )

  if (!data.ok) throw new Error('Failed to fetch data')

  return data.json()
}

export async function getTenDayForecast({ latitude, longitude }: coordinates) {
  const data = await fetch(
    `${process.env.VERCEL_URL}/api/weather/daily_forecast?lat=${latitude}&lon=${longitude}`
  )

  if (!data.ok) throw new Error('Failed to fetch data')

  return data.json()
}

export async function getHourlyData({
  latitude,
  longitude
}: coordinates): Promise<HourlyForecastResponse> {
  const data = await fetch(
    `http://localhost:3000/api/hourly_forecast?lat=${latitude}&lon=${longitude}`
  )

  if (!data.ok) throw new Error('Failed to fetch data')

  return data.json()
}

// prettier-ignore
export async function getAirPollutionData({ latitude, longitude }: coordinates) {
  const data = await fetch(
    `${process.env.VERCEL_URL}/api/weather/air_pollution?lat=${latitude}&lon=${longitude}`
  )

  if (!data.ok) throw new Error('Failed to fetch data')

  return data.json()
}
