import { button, getSwitch, status } from '../tp.js'

const s = await getSwitch()
const status = status(s)
s.power(!status)
console.log("TOGGLING", status)