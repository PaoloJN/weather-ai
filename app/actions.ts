import { DailyForecastResponse, HourlyForecastResponse } from '@/lib/types'

interface coordinates {
  latitude: string
  longitude: string
}

const API_KEY = process.env.OPEN_WEATHER_API_KEY
const API_ENDPOINT = process.env.OPEN_WEATHER_API_ENDPOINT

export async function getUVData({ latitude, longitude }: coordinates) {
  const data = await fetch(
    `${process.env.VERCEL_URL}/api/weather/uv_index?lat=${latitude}&lon=${longitude}`
  )

  if (!data.ok) throw new Error('Failed to fetch data')

  return data.json()
}

// prettier-ignore
export async function getDailyForecast({ latitude, longitude }: coordinates): Promise<DailyForecastResponse> {
  //  `${process.env.VERCEL_URL}/api/weather/daily_forecast?lat=${latitude}&lon=${longitude}`

  console.log('Called getDailyForecast')

  const data = await fetch(
    `${API_ENDPOINT}/api/weather/daily_forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
  )

  if (!data.ok) throw new Error('Failed to fetch data')

  return data.json()
}

// prettier-ignore
export async function getHourlyData({ latitude, longitude }: coordinates): Promise<HourlyForecastResponse> {
  // `http://localhost:3000/api/hourly_forecast?lat=${latitude}&lon=${longitude}`

  console.log('Called getHourlyData')

  const data = await fetch(
    `${API_ENDPOINT}/api/weather/hourly?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
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
