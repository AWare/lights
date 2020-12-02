import { getSwitch, button } from '../tp.js'
 import Lifx from "node-lifx-lan";
import { wait } from './wake.js';

const sunset = [{ "h": 0.05687203791469195, "s": 0.8902953586497889, "l": 0.5352941176470588 }, { "h": 0.9894636015325671, "s": 0.7631578947368421, "l": 0.44705882352941173 }, { "h": 0.9054373522458629, "s": 0.8245614035087719, "l": 0.33529411764705885 }, { "h": 0.7966101694915254, "s": 0.9365079365079365, "l": 0.24705882352941178 }, { "h": 0.6994535519125683, "s": 0.7530864197530865, "l": 0.1588235294117647 }]
const cycle = 1000 // * 60 * 10
const fade = 1000 //* 60 

let temp = 2500

const run = async () => {
  console.log("TIME TO SLEEP")
  const s = await getSwitch()
  s.power(true)
  const { onChange, hasChanged } = await button(s)
  onChange(async () => {
    console.log("TURN IT OFFF")
    await Lifx.turnOffBroadcast({ duration: 4000 })
    await wait(1000* 60)
    process.exit(0)
  })
  let b = 1
  let n = 12
  Lifx.turnOnBroadcast()
  while (n > 0) {
    const devices = await Lifx.discover()
    devices.map(lamp => {
    const colour = sunset[~~(Math.random() * sunset.length)]
      console.log(lamp.deviceInfo.label,colour)
      lamp.setColor({
        color: {
          hue: colour.h,
          saturation: colour.s,
          brightness: b,
          kelvin: temp
        },
        duration: fade
      })
    })

   console.log("CYCLE")
    b = b * 0.7
    n--
    await wait(cycle)
  }
  console.log("OFF")
  s.power(false)
  await wait(6000)
  await Lifx.turnOffBroadcast({duration: 4000})
  await(6000)
  console.log("OFF")
  await Lifx.turnOffBroadcast({duration: 4000})
  
  console.log("OFF")
  await (6000)
  const bulbs = await Lifx.discover()
  console.log(JSON.stringify(await Promise.allSettled(bulbs.map(light => light.getLightState())),null,2))

  process.exit(0)
}

run()