export const formatName = (str) => {
  const $str = str.replace(/[A-Z]/g, (match) => ' ' + match)
  return $str.substr(0, 1).toUpperCase() + $str.substr(1)
}
