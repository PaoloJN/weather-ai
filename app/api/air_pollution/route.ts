const API_KEY = process.env.OPEN_WEATHER_API_KEY

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const latitude = searchParams.get('lat')
  const longitude = searchParams.get('lon')

  if (!latitude || !longitude) {
    return Response.json({ message: 'Missing parameters' }, { status: 400 })
  }

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`,
    { next: { revalidate: 900 } }
  )

  if (!response.ok) throw new Error('Failed to fetch data')

  const data = await response.json()

  return Response.json(data)
}
