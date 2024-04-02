// TODO: Make this number dynamic
const API_KEY = process.env.OPEN_WEATHER_API_KEY
const NUMBER_OF_DAYS = 10

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const latitude = searchParams.get('lat')
  const longitude = searchParams.get('lon')

  if (!latitude || !longitude) {
    return Response.json({ message: 'Missing parameters' }, { status: 400 })
  }

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&cnt=${NUMBER_OF_DAYS}&units=metric&appid=${API_KEY}`,
    { next: { revalidate: 900 } }
  )

  if (!response.ok) throw new Error('Failed to fetch data')

  const data = await response.json()

  return Response.json(data)
}
