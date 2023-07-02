export const formatDuration = (duration: number | string) => {
  let sec: number
  if (typeof duration === 'string') {
    const regex = /[^0-9]/g
    const result = duration.replace(regex, '')
    sec = parseInt(result)
  } else {
    sec = duration
  }
  if (sec > 3600) {
    const hour = Math.floor(sec / 3600)
    const min = Math.floor((sec - hour * 3600) / 60)
    return `${hour}時間 ${min}分`
  }
  const min = Math.floor(sec / 60)
  return `${min}分`
}

export const formatDistance = (distance: number) => {
  return distance > 1000 ? `${(distance / 1000).toFixed(1)}km` : `${distance}m`
}

export const decodePath = (encodedPath: string, precision = 5) => {
  const factor = Math.pow(10, precision)

  const len = encodedPath.length

  // For speed we preallocate to an upper bound on the final length, then
  // truncate the array before returning.
  const path = new Array(Math.floor(encodedPath.length / 2))
  let index = 0
  let lat = 0
  let lng = 0
  let pointIndex = 0

  // This code has been profiled and optimized, so don't modify it without
  // measuring its performance.
  for (; index < len; ++pointIndex) {
    // Fully unrolling the following loops speeds things up about 5%.
    let result = 1
    let shift = 0
    let b: number
    do {
      // Invariant: "result" is current partial result plus (1 << shift).
      // The following line effectively clears this bit by decrementing "b".
      b = encodedPath.charCodeAt(index++) - 63 - 1
      result += b << shift
      shift += 5
    } while (b >= 0x1f) // See note above.
    lat += result & 1 ? ~(result >> 1) : result >> 1

    result = 1
    shift = 0
    do {
      b = encodedPath.charCodeAt(index++) - 63 - 1
      result += b << shift
      shift += 5
    } while (b >= 0x1f)
    lng += result & 1 ? ~(result >> 1) : result >> 1

    path[pointIndex] = [lat / factor, lng / factor]
  }
  // truncate array
  path.length = pointIndex

  return path.map((p) => {
    return { lat: p[0], lng: p[1] }
  })
}
