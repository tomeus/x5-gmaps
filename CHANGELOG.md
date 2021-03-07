# Change Log
All notable changes to this project will be documented in this file.

## [1.0.0] - Typescript and Vue 3 support

### Summary

Full version bundling some major requested upgrades (Vue 3 and Typescript)

- [TYPESCRIPT Support](https://www.typescriptlang.org/)
  Requested by @mheob [here](https://github.com/xon52/x5-gmaps/issues/3)
- [VUE 3 Support](https://v3.vuejs.org/)
  Requested by @thefoxie and @stereonom [here](https://github.com/xon52/x5-gmaps/issues/25)

### Added
- [API options](https://developers.google.com/maps/documentation/javascript/url-params) as parameters (e.g. API version, language, and region)
- Actual code splitting so you only import components that you use
- All Google provided component events
  - e.g. `<gmaps-map>` has the Google Maps [Map events](https://developers.google.com/maps/documentation/javascript/reference/map#Map-Events),
- Unlike Google's events, for those that make sense a new value is returned instead of the event:
  - e.g. `<gmaps-map>` event `bounds_changed` returns the new bounds
- All provided components now have a prop `delay` which debounces the events that tend to get out of control (e.g. `position_changed`, `mouseover`) - default is 15 (ms)

### Changed
<!-- TODO: Add issue to import CSS automatically -->
- You must manually import the CSS file from the package (thanks to code splitting) - I am working to fix this
- Replaced a comparison function that would only emit if an event (e.g. positionChanged) had changed enough with a [packaged debounce function](https://github.com/chodorowicz/ts-debounce)
- The `<gmaps-polygon>` component not takes `paths` instead of `path` as a variable. This is an array of arrays of points ({lat, lng}). This is how Google designed it so that you could do more complex shapes like making [hole inside a polygon](https://developers.google.com/maps/documentation/javascript/examples/polygon-hole). It should be able to consume a single array without breaking, but it will always return an array of arrays.

### Deprecated

### Removed
- Key only format for `use`ing the plugin; you must include your Google API key inside an options object. e.g. `use(gmaps, { key: YOUR_KEY })`
- All the modified event names for all components (e.g. the is no longer a `move` event for Marker - it's now the Google defined `position_changed`)

<!-- Template
## [1.0.0] - Title

Description

### Added
### Changed
### Deprecated
### Removed
### Fixed
### Security

-------------------------------------------------
The format is based on [Keep a Changelog](http://keepachangelog.com/)
-->