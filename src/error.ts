const messages = {
  KEY_MISSING: () => call("A Google API 'key' is required for plugin install."),
  LIB_ISSUE: () =>
    call('Libraries must be an array library names (as strings).'),
  SCRIPT_LOAD: () =>
    call('There was an error loading the Google Maps API script.'),
  TIMEOUT: () => call('Google Maps could not be loaded.'),
}

const call = (message: string): Error => new Error(`x5-gmaps :: ${message}`)

export default { ...messages }
