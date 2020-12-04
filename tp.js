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
export const TURNED_OFF = 'turnedoff'
export const TURNED_ON = 'turnedon'
export const NOT_CHANGED = 'notchanged'

export const onChange = (light) => new Promise(resolve => {
    const checkStatus = async (oldStatus) => {
      const newStatus = await status(light)
      // console.log('tick', newStatus, oldStatus)
      if (oldStatus !== undefined && oldStatus !== newStatus) {
        resolve(newStatus?TURNED_ON:TURNED_OFF)
        return
      }
      setTimeout(()=>checkStatus(newStatus), 1000)
    }
    setTimeout(()=>checkStatus(), 1000)
  })
 
