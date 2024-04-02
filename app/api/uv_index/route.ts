export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const latitude = searchParams.get('lat')
  const longitude = searchParams.get('lon')

  if (!latitude || !longitude) {
    return Response.json({ message: 'Missing parameters' }, { status: 400 })
  }

  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=uv_index_max,uv_index_clear_sky_max&timezone=auto&forecast_days=1`,
    { next: { revalidate: 900 } }
  )

  if (!response.ok) throw new Error('Failed to fetch data')

  const data = await response.json()

  return Response.json(data)
}
