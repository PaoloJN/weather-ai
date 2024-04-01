'use client'

import { useEffect, useMemo, useState } from 'react'
import { Card } from '@/components/ui/card'
import { useSearchParams } from 'next/navigation'
import { DEFAULT_LOCATION } from '@/lib/config'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

interface WeatherMapProps {
  latitude: number | string
  longitude: number | string
  zoom: number
  layer: string
}

// Change to take params instead of using search params
export function WeatherMap({
  latitude,
  longitude,
  layer,
  zoom
}: WeatherMapProps) {
  const [mapState, setMapState] = useState<WeatherMapProps>({
    latitude: latitude ? latitude.toString() : DEFAULT_LOCATION.coord.lat,
    longitude: longitude ? longitude.toString() : DEFAULT_LOCATION.coord.lon,
    layer: layer || 'temperature',
    zoom: zoom || 5
  })

  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const weatherTiles = [
    { label: 'Temperature (°C)', code: 'temperature' },
    { label: 'Rain and Thunderstorms (mm)', code: 'rain' },
    { label: 'Wind Speed and Direction (m/s)', code: 'wind' },
    { label: 'Cloudiness (%)', code: 'clouds' },
    { label: 'Atmospheric Pressure (hPa)', code: 'pressure' }
  ]

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
        <iframe
          width="710"
          height="500"
          className={`absolute -translate-y-8 ${loaded ? 'block' : 'hidden'}`}
          src={`https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=default&metricTemp=default&metricWind=default&zoom=${mapState.zoom}&overlay=${mapState.layer}&product=ecmwf&level=surface&lat=${mapState.latitude}&lon=${mapState.longitude}`}
        ></iframe>
      </Card>
      {/* <span className="text-xs text-muted-foreground">
        Map Powered by Windy.com
      </span> */}
    </div>
  )
}
