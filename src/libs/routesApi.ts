import axios, { AxiosRequestConfig } from 'axios'

/* types */
import { LatLng, Route, WayPoint } from '../types/location'

type RoutesApiResponse = {
  routes: Route[]
}

type RoutesApiParams = {
  origin: string | LatLng
  destination: string | LatLng
  travelMode: 'DRIVE' | 'BICYCLE' | 'WALK'
}

const apiURL = 'https://routes.googleapis.com/directions/v2:computeRoutes'

export const getRoutesApiResponse = async (params: RoutesApiParams): Promise<Route> => {
  const origin: WayPoint =
    typeof params.origin === 'string'
      ? { address: params.origin }
      : { location: { latLng: params.origin } }
  const destination: WayPoint =
    typeof params.destination === 'string'
      ? { address: params.destination }
      : { location: { latLng: params.destination } }
  const postData = {
    origin,
    destination,
    travelMode: params.travelMode,
  }
  const postConfig: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': process.env.NEXT_PUBLIC_ROUTES_API_KEY,
      'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters',
    },
  }
  const res = await axios.post<RoutesApiResponse>(apiURL, postData, postConfig)
  return res.data.routes[0]
}
