import TPLSmartDevice from 'tplink-lightbulb'

export const getSwitch = () => new Promise((resolve, reject) => {
  const scan = TPLSmartDevice.scan()
    scan.on('light', light => {
    scan.stop()
    resolve(light)
  })
  
})

export const status = async (light) => {
  const info = await light.info()
  return info.relay_state === 1
}

 
