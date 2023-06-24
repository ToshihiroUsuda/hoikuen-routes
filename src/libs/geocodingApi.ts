import axios, { AxiosRequestConfig } from 'axios'

/*types */
import { LatLng } from '../types/location'

export type GeocodingApiResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[]
}

const apiURL = 'https://maps.googleapis.com/maps/api/geocode/json'

export const getGeocodeApiResponse = async (address: string): Promise<LatLng> => {
  const config: AxiosRequestConfig = {
    params: {
      address: address,
      key: process.env.NEXT_PUBLIC_MAP_API_KEY,
    },
  }
  const res = await axios.get<GeocodingApiResponse>(apiURL, config)
  const location = res.data.results[0].geometry.location
  return { latitude: location.lat, longitude: location.lng }
}
