import LifxClient from 'lifx-lan-client'
import _ from 'lodash'
const { Client } = LifxClient
const lifx = new Client()

export const getLights = _.memoize(() => new Promise((resolve) =>
{
  let n = 2;
  let lights = {}
  lifx.init()
  lifx.on('light-new', light => {
   
    light.getLabel((_, label) => {
      lights[label] = light
      n--
      if (n == 0) {
        resolve(lights)
      }
    })
  })
  
}))