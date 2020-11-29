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

export const button = async (light) => {
  let outsideResolve = () => { }
  const promise = new Promise(resolve => {
    outsideResolve = resolve
  })
  const initial = await status(light)
  let f = () => { }
  let changed = false
  const loop = async () => {
    const newStatus = await status(light)
    if (newStatus !== initial) {
      changed = true
      f()
      outsideResolve()
      console.log(status)
      return
    }
    setTimeout(loop, 500)
  }
  setTimeout(loop, 500)
  return {
    hasChanged: () => changed,
    onChange: (fn) => f = fn,
    promise
  }
}

 
