var geolib = require('geolib')

var distanceList = geolib.orderByDistance(
  { latitude: 36.322356, longitude: 139.013057 }, //高崎駅
  [
    { latitude: 36.383191, longitude: 139.073177 }, //前橋駅
    { latitude: 36.41107600000001, longitude: 139.333037 }, //桐生駅
    { latitude: 36.294066, longitude: 139.378734 }, //太田駅
    { latitude: 36.250183, longitude: 139.08331599999997 }, //藤岡駅
  ],
  null,
  1,
)
console.log(distanceList)
