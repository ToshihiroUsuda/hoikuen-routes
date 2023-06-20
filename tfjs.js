const tf = require('@tensorflow/tfjs-node')

let array = []
const length = 3000 // 配列長

for (let i = 0; i < length; i++) {
  // 値が０から１までの
  array.push([Math.random(), Math.random()])
}

const refPos = [Math.random(), Math.random()]

const hrstart = process.hrtime()

let distArray = []
let minDist = 1000000
let minIndex = null
for (let i = 0; i < length; i++) {
  const [x, y] = array[i]
  const [rx, ry] = refPos
  const dist = (x - rx) * (x - rx) + (y - ry) * (y - ry)
  if (dist < minDist) {
    minDist = dist
    minIndex = i
  }
  distArray.push(dist)
}
// const minIndex = distArray.argMin()
const hrend = process.hrtime(hrstart)
console.log(hrend[1] / 1000000, minIndex)

const hrstartR = process.hrtime()

const { minIndexR } = array.reduce(
  (acc, value, index) => {
    const sumsq =
      (value[0] - refPos[0]) * (value[0] - refPos[0]) +
      (value[1] - refPos[1]) * (value[1] - refPos[1])
    if (sumsq < acc.minValue) {
      return { minValue: sumsq, minIndexR: index }
    }
    return acc
  },
  { minValue: 100000000, minIndexR: 0 },
)

const hrendR = process.hrtime(hrstartR)
console.log(hrendR[1] / 1000000, minIndexR)

// const tfstart = process.hrtime()
// const refPosTf = tf.tensor2d([refPos])
// const posTf = tf.tensor2d(array)
// const distTf = posTf
//   .sub(refPosTf)
//   .pow(2)
//   .sum((axis = 1))
// distTf.print()
// const minIndexTf = distTf.argMin()
// minIndexTf.print()
//   .argMin()
//   .data()
//   .then((v) => {
//     const tfend = process.hrtime(tfstart)
//     console.log(tfend, v)
//   })
