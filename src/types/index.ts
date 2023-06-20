type LatLng = {
  latitude: number
  longitude: number
}

type Route = {
  distanceMeters: number
  duration: string
}

type WayPoint = {
  address?: string
  location?: { latLng: LatLng }
}

type HoikuenLocation = {
  name: string
  address: string
} & LatLng

type HoikuenRoute = HoikuenLocation & Route
