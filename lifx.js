import LifxClient from 'lifx-lan-client'
const { Client } = LifxClient
const lifx = new Client()

lifx.init()

lifx.on('light-new', light => {
  light.getLabel((_, label) => {
    lights[label] = light
  })
})

export let lights = {}