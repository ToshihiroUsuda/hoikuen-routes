import { getDistance } from 'geolib'

/* types */
import { LatLng, HoikuenLocation } from '../types/location'

import kanagawaLocation from './data/kanagawa.json'

export const prefectureMap = {
  kanagawa: '神奈川県',
  tokyo: '東京都',
}

export const prefectureNames = Object.keys(prefectureMap)

export type Prefecture = keyof typeof prefectureMap

const hoikuenLocationDict: Record<Prefecture, HoikuenLocation[]> = {
  kanagawa: kanagawaLocation,
  tokyo: kanagawaLocation,
}

export const getTopKNearestHoikuen = (
  origin: LatLng,
  prefecture: Prefecture,
  topK: number,
  types: string[],
  age: number,
  capacity: number,
  maxDistance: number = 5000,
) => {
  return hoikuenLocationDict[prefecture]
    .slice()
    .filter((hoikuen) => {
      const destination: LatLng = { latitude: hoikuen.latitude, longitude: hoikuen.longitude }
      return getDistance(origin, destination) < maxDistance
    })
    .filter((hoikuen) => {
      switch (age) {
        case 0:
          return hoikuen.capacityAge0 > capacity
        case 1:
          return hoikuen.capacityAge1 > capacity
        case 2:
          return hoikuen.capacityAge2 > capacity
        case 3:
          return hoikuen.capacityAge3 > capacity
        case 4:
          return hoikuen.capacityAge4 > capacity
        case 5:
          return hoikuen.capacityAge5 > capacity
        default:
          return false
      }
    })
    .filter((hoikuen) => {
      // 部分一致する施設類型があるか
      return types.findIndex((type) => hoikuen.type.indexOf(type) > -1) > -1
    })
    .sort((a, b) => {
      const coordA: LatLng = { latitude: a.latitude, longitude: a.longitude }
      const coordB: LatLng = { latitude: b.latitude, longitude: b.longitude }
      return getDistance(origin, coordA) - getDistance(origin, coordB)
    })
    .slice(0, topK)
}
