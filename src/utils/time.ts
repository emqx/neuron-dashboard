import dayjs from 'dayjs'

export const formatTime = (time: number): string => dayjs(time * 1000).format('YYYY-MM-DD HH:mm:ss')

export const setTimeDate = (time: number): number => Math.floor(time / 1000)

export default {}
