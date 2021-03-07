export const debounce = (func: (...args: any[]) => any, delay = 15) => {
  let timeId: number
  return function (...args: any[]) {
    if (timeId) clearTimeout(timeId)
    timeId = setTimeout(() => func(...args), delay)
  }
}
