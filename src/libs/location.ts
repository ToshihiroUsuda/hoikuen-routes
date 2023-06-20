import { getDistance } from 'geolib'
import kanagawaLocation from './data/kanagawa.json'

const hoikuenLocationDict: Record<string, HoikuenLocation[]> = {
  Kanagawa: kanagawaLocation,
}

export const getTopKNearestHoikuen = (
  origin: LatLng,
  prefecture: 'Kanagawa' | '',
  topK: number,
) => {
  return hoikuenLocationDict[prefecture]
    .slice()
    .sort((a, b) => {
      const coordA: LatLng = { latitude: a.latitude, longitude: a.longitude }
      const coordB: LatLng = { latitude: b.latitude, longitude: b.longitude }
      return getDistance(origin, coordA) - getDistance(origin, coordB)
    })
    .slice(0, topK)
}
