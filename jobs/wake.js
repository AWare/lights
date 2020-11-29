const MIN_H = 359
const MAX_H = 290
const FADE_IN_DURATION = 0
const SUNRISE_DURATION = 30 * 60 * 1000
const COLD_DURATION = 5 * 60 * 1000
const TEMP = 9000
const TEMP_STABLE = 3500
const SNOOZE = 1000 * 60 * 5

import { button, getSwitch, status } from '../tp.js'
import { getLights } from '../lifx.js'



const wait = (t) => new Promise(resolve => {
  setTimeout(()=>resolve(),t)
})

const run = async () => {
  console.log("START")
  const sw = await getSwitch()
  const ls = await getLights()

  const { onChange, hasChanged } = await button(sw)
  onChange(async () => {
    let {promise} = await button(sw)
    ls.lemp.off(1000)
    ls.lomp.off(1000)
    await Promise.race([wait(SNOOZE), promise])
    run()
  })
  console.log("HI")

  ls.lemp.off()
  ls.lomp.off()
  ls.lemp.color(MIN_H, 100, 0, TEMP, FADE_IN_DURATION)
  ls.lomp.color(MIN_H, 100, 0, TEMP, FADE_IN_DURATION)
  ls.lemp.on()
  ls.lomp.on()
  console.log(hasChanged)
  if (hasChanged()) return;
  console.log("TURN ON")
  sw.power(true)
  ls.lemp.color(MAX_H, 100, 100, TEMP, SUNRISE_DURATION)
  ls.lomp.color(MAX_H, 100, 100, TEMP, SUNRISE_DURATION)

  await wait(SUNRISE_DURATION)
  if (hasChanged()) return;

  console.log("WHITE")
  ls.lemp.color(0, 0, 100, TEMP, COLD_DURATION)
  ls.lomp.color(0, 0, 100, TEMP, COLD_DURATION)

  await (COLD_DURATION)
  if (hasChanged()) return;

  ls.lemp.color(0, 0, 100, TEMP_STABLE,COLD_DURATION)
  ls.lomp.color(0, 0, 100, TEMP_STABLE, COLD_DURATION)
  console.log("DONE")

  await(5000)
  onChange(()=>{})
  process.exit(0)

}
run()