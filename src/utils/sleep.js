export const sleep = async (time = 0) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve()
    }, time)
  })
}
