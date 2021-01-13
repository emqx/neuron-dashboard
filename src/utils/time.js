export const setOneHourTime = () => {
  const date = new Date()
  const now = date.getTime()
  const hour = now - 1 * 60 * 60 * 1000
  return [hour, now]
}

export const setTimeDate = (time) => Math.floor(time / 1000)

export default {}
