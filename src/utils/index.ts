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
