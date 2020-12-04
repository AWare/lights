const wait = (t) =>
  new Promise((resolve) => {
    console.log("WAITING ", t);
    setTimeout(() => resolve(), t);
  });


export const dontfail = async (f, n) => {
  return f().then(_ => _, err => {
    console.trace("SOMETHING WENT WRONG")
    console.error(err)
    return new Promise(resolve => {
      setTimeout(() => {
        f().then(resolve)
      }, 10000)
    })
  })
}