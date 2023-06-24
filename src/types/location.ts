export type LatLng = {
  latitude: number
  longitude: number
}

export type Route = {
  distanceMeters: number
  duration: string
}

export type WayPoint = {
  address?: string
  location?: { latLng: LatLng }
}

export type HoikuenLocation = {
  name: string
  address: string
} & LatLng

export type HoikuenRoute = HoikuenLocation & Route
