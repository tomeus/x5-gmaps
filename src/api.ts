import error from './error'

// Promises to return
const _promises: {
  resolve: (map: any) => void // eslint-disable-line @typescript-eslint/no-explicit-any
  reject: (err: Error) => void
}[] = []

// Call for Google Maps API
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getMaps = (): Promise<any | Error> =>
  new Promise((resolve, reject) => {
    if (window.google?.maps) return resolve(window.google.maps)
    _promises.push({ resolve, reject })
  })

// On success callback
export const onSuccess = (): void => {
  const map = window?.google.maps
  if (!map) return onFail(error.SCRIPT_LOAD())
  _promises.forEach((e) => e.resolve(window.google.maps))
}
// On fail callback
export const onFail = (err: Error): void => {
  _promises.forEach((e) => e.reject(err))
}
