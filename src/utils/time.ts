import dayjs from 'dayjs'
import i18n from '@/i18n/index'

export const formatTime = (time: number): string => {
  return dayjs(time * 1000).format('YYYY-MM-DD HH:mm:ss')
}

export const setTimeDate = (time: number): number => {
  return Math.floor(time / 1000)
}

export const timeUnitI18n = (type: string, time: number): string => {
  const dataMap = new Map([
    ['day', i18n.global.t('common.day', time)],
    ['hour', i18n.global.t('common.hour', time)],
    ['minute', i18n.global.t('common.minute', time)],
    ['second', i18n.global.t('common.second', time)],
  ])
  return dataMap.get(type) || ''
}

export const secondToTime = (seconds: number): string => {
  if (!seconds) return `0 ${i18n.global.t('common.second', 0)}`

  let time = ''
  if (seconds < 60) {
    // {xx} seconds
    time = `${seconds} ${timeUnitI18n('second', seconds)}`
  } else if (seconds >= 60 && seconds < 3600) {
    // {xx} minutes {xx} seconds
    const minutes = Math.floor(seconds / 60)
    const sec = Math.floor(seconds % 60)
    time = `${minutes} ${timeUnitI18n('minute', minutes)} ${sec} ${timeUnitI18n('second', seconds)}`
  } else {
    const hours = Math.floor(seconds / (60 * 60))
    const minutes = Math.floor(Math.floor(seconds % 3600) / 60)
    const sec = Math.floor(Math.floor(seconds % 3600) % 60)

    const minuteUnit = timeUnitI18n('minute', minutes)
    const secondUnit = timeUnitI18n('second', sec)

    if (hours > 0 && hours < 24) {
      // {xx} hours {xx} minutes {xx} seconds
      time = `${hours} ${timeUnitI18n('hour', hours)} ${minutes} ${minuteUnit} ${sec} ${secondUnit}`
    } else {
      // {xx} days {xx} hours {xx} minutes {xx} seconds
      const days = Math.floor(hours / 24)
      const h = hours - 24 * days
      time = `${days} ${timeUnitI18n('day', days)} ${h} ${timeUnitI18n(
        'hour',
        h,
      )} ${minutes} ${minuteUnit} ${sec} ${secondUnit}`
    }
  }
  return time
}
