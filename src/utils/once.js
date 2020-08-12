export function once(func) {
  let flag = true
  return function (res) {
    if (flag) {
      func(res)
    }
    flag = false
  }
}
