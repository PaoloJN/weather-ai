type Coordinates = {
  lon: string
  lat: string
}
export type Location = {
  city: string
  coord: Coordinates
}

export type OpenWeatherData = {
  coord: {
    lon: number
    lat: number
  }
  weather: {
    id: number
    main: string
    description: string
    icon: string
  }[]
  base: string
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  visibility: number
  wind: {
    speed: number
    deg: number
  }
  clouds: {
    all: number
  }
  dt: number
  sys: {
    type: number
    id: number
    country: string
    sunrise: number
    sunset: number
  }
  timezone: number
  id: number
  name: string
  cod: number
}

export type HourlyForecastData = {
  dt: number
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  weather: {
    id: number
    main: string
    description: string
    icon: string
  }[]
  clouds: {
    all: number
  }
  wind: {
    speed: number
    deg: number
    gust: number
  }
  visibility: number
  pop: number
  rain?: {
    '1h': number
  }
  sys: {
    pod: 'd' | 'n'
  }
  dt_txt: string
}

export const hourlyDummy: HourlyForecastData = {
  dt: 1683377969,
  main: {
    temp: -3.05,
    feels_like: 18.37,
    temp_min: -4.48,
    temp_max: -6.59,
    pressure: 1010,
    humidity: 41
  },
  weather: [
    { id: 212, main: 'Rain', description: 'few clouds', icon: '13n' },
    { id: 212, main: 'Rain', description: 'clear sky', icon: '09d' }
  ],
  clouds: { all: 59 },
  wind: { speed: 8.47, deg: 332, gust: 21.28 },
  visibility: 2191,
  pop: 0.69,
  rain: { '1h': 3.77 },
  sys: { pod: 'n' },
  dt_txt: '2023-12-28 07:31:07'
}

export const arrayOfHourlyDummy = new Array(12).fill(hourlyDummy)

export type HourlyForecastResponse = {
  cod: string
  message: number
  cnt: number
  list: HourlyForecastData[]
  city: City
}

export type AirQualityData = {
  dt: number
  main: {
    aqi: 1 | 2 | 3 | 4 | 5
  }
  components: {
    co: number // Concentration of CO (Carbon monoxide), μg/m3
    no: number // Concentration of NO (Nitrogen monoxide), μg/m3
    no2: number // Concentration of NO2 (Nitrogen dioxide), μg/m3
    o3: number // Concentration of O3 (Ozone), μg/m3
    so2: number // Concentration of SO2 (Sulphur dioxide), μg/m3
    pm2_5: number // Concentration of PM2.5 (Fine particles matter), μg/m3
    pm10: number // Concentration of PM10 (Coarse particulate matter), μg/m3
    nh3: number // Concentration of NH3 (Ammonia), μg/m3
  }
}

export const airQualityDummy: AirQualityData = {
  dt: 1631931003,
  main: {
    aqi: 1
  },
  components: {
    co: 0.1,
    no: 0.1,
    no2: 0.1,
    o3: 0.1,
    so2: 0.1,
    pm2_5: 0.1,
    pm10: 0.1,
    nh3: 0.1
  }
}

export type AirPollutionResponse = {
  coord: Coordinates
  list: AirQualityData[]
}

type DailyUnits = {
  time: string
  uv_index_max: string
}

type DailyData = {
  time: string[]
  uv_index_max: number[]
}

export type UVIndexResponse = {
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  daily_units: DailyUnits
  daily: DailyData
}

export type City = {
  id: number
  name: string
  coord: {
    lon: number
    lat: number
  }
  country: string
  population: number
  timezone: number
  sunrise: number
  sunset: number
}

export const cityDummy: City = {
  id: 2643743,
  name: 'London',
  coord: { lon: -0.1257, lat: 51.5085 },
  country: 'GB',
  population: 1000000,
  timezone: 3600,
  sunrise: 1631931003,
  sunset: 1631931003
}

type Weather = {
  id: number
  main: string
  description: string
  icon: string
}

type Temperature = {
  day: number
  min: number
  max: number
  night: number
  eve: number
  morn: number
}

type FeelsLike = {
  day: number
  night: number
  eve: number
  morn: number
}

export type ForecastData = {
  dt: number
  sunrise: number
  sunset: number
  temp: Temperature
  feels_like: FeelsLike
  pressure: number
  humidity: number
  weather: Weather[]
  speed: number
  deg: number
  gust: number
  clouds: number
  pop: number
  rain?: number
}

export const forecastDummy: ForecastData = {
  dt: 1631931003,
  sunrise: 1631931003,
  sunset: 1631931003,
  temp: {
    day: 27.64,
    min: -16.9,
    max: -4.68,
    night: 27.64,
    eve: 27.64,
    morn: 27.64
  },
  feels_like: {
    day: 27.64,
    night: 27.64,
    eve: 27.64,
    morn: 27.64
  },
  pressure: 1003,
  humidity: 42,
  weather: [
    { id: 200, main: 'Rain', description: 'light rain', icon: '802n' },
    { id: 200, main: 'Clouds', description: 'clear sky', icon: '802n' },
    { id: 200, main: 'Clear', description: 'snow', icon: '802n' }
  ],
  speed: 12.14,
  deg: 123,
  gust: 12.14,
  clouds: 72,
  pop: 0.69,
  rain: 3.77
}

export type TenDayForecastData = {
  city: City
  cod: string
  message: number
  cnt: number
  list: ForecastData[]
}

export const tenDayForecastDummy: TenDayForecastData = {
  city: cityDummy,
  cod: '200',
  message: 0,
  cnt: 10,
  list: new Array(10).fill(forecastDummy)
}
