export type LatLng = {
  latitude: number
  longitude: number
}

export type Route = {
  distanceMeters: number
  duration: string
  polyline: { encodedPolyline: string }
}

export type WayPoint = {
  address?: string
  location?: { latLng: LatLng }
}

export type HoikuenLocation = {
  name: string
  address: string
  type: string
  capacityAge0: number
  capacityAge1: number
  capacityAge2: number
  capacityAge3: number
  capacityAge4: number
  capacityAge5: number
} & LatLng

export type HoikuenRoute = HoikuenLocation & Route
