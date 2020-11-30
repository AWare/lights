import { getSwitch, button } from '../tp.js'
import { getLights } from '../lifx.js'
 import Lifx from "node-lifx-lan";

const sunset = [{ "h": 0.05687203791469195, "s": 0.8902953586497889, "l": 0.5352941176470588 }, { "h": 0.9894636015325671, "s": 0.7631578947368421, "l": 0.44705882352941173 }, { "h": 0.9054373522458629, "s": 0.8245614035087719, "l": 0.33529411764705885 }, { "h": 0.7966101694915254, "s": 0.9365079365079365, "l": 0.24705882352941178 }, { "h": 0.6994535519125683, "s": 0.7530864197530865, "l": 0.1588235294117647 }]
const cycle = 1000 * 60 * 10
const fade = 1000 * 60 

const wait = (t) => new Promise(resolve => {
  setTimeout(()=>resolve(),t)
})

let temp = 2500

const run = async () => {
  const s = await getSwitch()
  s.power(true)
  const ls = await getLights()

  const { onChange, hasChanged } = await button(s)
  onChange(async () => {
    await Lifx.turnOffBroadcast({ duration: 4000 })
    process.exit(0)
  })
  console.log(Object.keys(ls))
  let b = 100
  let n = 12
  ls.lemp.on()
  ls.lomp.on()
  while (n > 0) {
    if (hasChanged()) {
      process.exit(0)
    }
    const coloura = sunset[~~(Math.random() * sunset.length)]
    const colourb = sunset[~~(Math.random() * sunset.length)]

    ls.lemp.color(coloura.h * 360, coloura.s * 100, b, temp, fade)
    
    ls.lomp.color(colourb.h * 360, colourb.s * 100, b, temp, fade)
    b = b * 0.7
    console.log(b)
    n--
    await wait(cycle)
  }
  console.log("OFF")

  Lifx.turnOffBroadcast({duration: 4000})
  console.log("OFF")

  await(2000)
  s.power(false)
  console.log("OFF")
  await (1000)
  process.exit(0)
}

run()