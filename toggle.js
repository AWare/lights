import { button, getSwitch, status } from '../tp.js'

const s = await getSwitch()
const st = status(s)
s.power(!st)
console.log("TOGGLING", st)