import TPLSmartDevice from 'tplink-lightbulb'
import LifxClient from 'lifx-lan-client'
const {Client} = LifxClient

let tplights = []
let fxlights = []
let tpon = []

const tpscan = TPLSmartDevice.scan().on('light', light => {
  light.info().then(info => {
    console.log(info)
  })
  tplights.push(light)
})
const lifx = new Client()

lifx.init()

lifx.on('light-new', light => {
  fxlights.push(light)
  // console.log(light)
  // light.getLabel((_, label) => {
  //   console.log(label)
  // })
  // light.getState((_,state) => {
  //   console.log(state)
  // })
})

setInterval(() => {
  tplights.map((tp,i) => {
    tp.info().then(({relay_state})=>{
      const state = tpon[i]
      tpon[i] = relay_state
      if (state != relay_state) {
        console.log("CHANGE DETECTED ", relay_state)
        fxlights.map(fx => {
          if (relay_state == 1) {
            fx.on(1000)
          } else {
            fx.off(1000)
          }
        })
      }
        
    })
  })
},500)
