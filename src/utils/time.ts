import dayjs from 'dayjs'

export const formatTime = (time: number): string => {
  return dayjs(time * 1000).format('YYYY-MM-DD HH:mm:ss')
}

export const setTimeDate = (time: number): number => {
  return Math.floor(time / 1000)
}

export default {}
