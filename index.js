import { getSwitch, status } from './tp.js'
import {getLights} from './lifx.js'

const TEN_MINUTES = 10 * 60 * 1000;
const FADE_OUT = 1000
const FADE_IN = 60 * 1000


const loop = (async () => {
  const lightSwitch = await getSwitch()
  let isOn = await status(lightSwitch)

  const lights = await getLights()

  const turnOn = () => {
    if (lights && lights.lemp) {
      console.log("TURNING ON")
      lights.lemp.on(FADE_IN)
    } 
  }
  const turnOff = () => {
    if (lights && lights.lemp) {
      console.log("TURNING OFF")
      lights.lemp.off(FADE_OUT)

      // setTimeout(turnBackOn,TEN_MINUTES)
    }
  }
  // const turnBackOn = () => {
  //   console.log("TURNING BACK ON")
  //   lightSwitch.power(true)
  // }
  const loop = async () => {
    let isOnNow = await status(lightSwitch)
    if (isOn != isOnNow) {
      console.log("toggled to", isOnNow)
      isOn = isOnNow
      isOnNow ? turnOn() : turnOff()
      
    }
    setTimeout(loop,500)
  }
  loop()
})

loop()

