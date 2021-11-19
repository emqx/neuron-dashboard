import moment from 'moment'

export default (timeStamp) => {
  const value = timeStamp.length === 13 ? timeStamp : timeStamp * 1000
  return moment(value).format('YYYY-MM-DD HH:mm:ss')
}
