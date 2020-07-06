// 功能
// 深拷贝

export const clone = (obj) => {
  let res
  if (typeof obj === 'object') {
    res = Array.isArray(obj) ? [] : {}
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const element = obj[key]
        if (typeof element === 'object' && element !== null) {
          res[key] = clone(element)
        } else {
          res[key] = element
        }
      }
    }
  } else {
    res = obj
  }
  return res
}
