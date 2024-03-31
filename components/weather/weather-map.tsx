'use client'

// import 'mapbox-gl/dist/mapbox-gl.css'
import { useEffect, useMemo, useRef, useState } from 'react'
// import ReactMapGL, { Layer, LayerProps, Source } from 'react-map-gl'
import { Card } from '../ui/card'
import { useSearchParams } from 'next/navigation'
import { DEFAULT_LOCATION } from '@/lib/config'
import { useTheme } from 'next-themes'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Button } from '../ui/button'
import { IconPlus } from '../ui/icons'

interface MapState {
  latitude: number
  longitude: number
  zoom: number
  layer: string
}

// Change to take params instead of using search params
export default function WeatherMap() {
  const searchParams = useSearchParams()
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')
  const [mapState, setMapState] = useState<MapState>({
    latitude: lat ? parseFloat(lat) : Number(DEFAULT_LOCATION.coord.lat),
    longitude: lon ? parseFloat(lon) : Number(DEFAULT_LOCATION.coord.lon),
    layer: 'wind',
    zoom: 5
  })

  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const weatherTiles = useMemo(() => {
    return [
      { label: 'Temperature (°C)', code: 'temperature' },
      { label: 'Rain and Thunderstorms (mm)', code: 'rain' },
      { label: 'Wind Speed and Direction (m/s)', code: 'wind' },
      //   { label: 'Relative Humidity (%)', code: 'HRD0' },
      { label: 'Cloudiness (%)', code: 'clouds' },
      { label: 'Atmospheric Pressure (hPa)', code: 'pressure' }
    ]
  }, [])

  return (
    <div>
      <Card className="h-[25rem] overflow-hidden p-0 md:p-0 ">
        <div className="absolute bottom-0 m-2 z-30">
          <Select
            value={mapState.layer}
            onValueChange={value => setMapState({ ...mapState, layer: value })}
          >
            <SelectTrigger aria-label="Map layer" className="w-fit">
              <SelectValue placeholder="Map Layers" />
            </SelectTrigger>
            <SelectContent align="start" side="top">
              <SelectGroup>
                {weatherTiles.map(tile => (
                  <SelectItem key={tile.code} value={tile.code}>
                    {tile.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* <div className="absolute right-2 top-2 z-30 flex flex-col">
          <Button
            variant="outline"
            size="icon"
            className="w-8 h-8 rounded-none rounded-t-lg"
            onClick={() =>
              setMapState({ ...mapState, zoom: mapState.zoom + 1 })
            }
          >
            <IconPlus />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="w-8 h-8 rounded-none rounded-b-lg"
            onClick={() =>
              setMapState({ ...mapState, zoom: mapState.zoom - 1 })
            }
          >
            <IconPlus />
          </Button>
        </div> */}
        <iframe
          width="710"
          height="500"
          className={`absolute -translate-y-8 ${loaded ? 'block' : 'hidden'}`}
          src={`https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=default&metricTemp=default&metricWind=default&zoom=${mapState.zoom}&overlay=${mapState.layer}&product=ecmwf&level=surface&lat=37.571&lon=-79.371`}
        ></iframe>
      </Card>
      {/* <span className="text-xs text-muted-foreground">
        Map Powered by Windy.com
      </span> */}
    </div>
  )
}
