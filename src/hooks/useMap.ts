import { useCallback, useMemo } from 'react'
import { useJsApiLoader } from '@react-google-maps/api'
import { LatLng } from '../types/location'

export type Map = google.maps.Map

type Props = {
  origin: LatLng
  destinations: LatLng[]
}

export const useMap = ({ origin, destinations }: Props) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map',
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API_KEY || '',
  })

  const { bounds } = useMemo(() => {
    return destinations.reduce(
      (stats, value) => {
        const lat = value.latitude
        const lng = value.longitude
        const diffLat = Math.abs(lat - origin.latitude)
        const diffLng = Math.abs(lng - origin.longitude)

        const maxDist: LatLng = {
          latitude: Math.max(diffLat, stats.maxDist.latitude),
          longitude: Math.max(diffLng, stats.maxDist.longitude),
        }
        const bounds: LatLng[] = [
          {
            latitude: origin.latitude - maxDist.latitude,
            longitude: origin.longitude - maxDist.longitude,
          },
          {
            latitude: origin.latitude + maxDist.latitude,
            longitude: origin.longitude + maxDist.longitude,
          },
        ]
        return {
          bounds,
          maxDist,
        }
      },
      { bounds: [origin, origin], maxDist: { latitude: 0, longitude: 0 } },
    )
  }, [origin, destinations])

  const onLoad = (map: Map) => {
    const latLngBounds = new window.google.maps.LatLngBounds(
      new window.google.maps.LatLng(bounds[0].latitude, bounds[0].longitude),
      new window.google.maps.LatLng(bounds[1].latitude, bounds[1].longitude),
    )
    map.fitBounds(latLngBounds, 32)
  }

  const onUnmount = useCallback(() => {}, [])

  return { isLoaded, onLoad, onUnmount }
}
