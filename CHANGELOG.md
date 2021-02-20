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


### Changed
<!-- TODO: Add issue to import CSS automatically -->
- You must manually import the CSS file from the package (thanks to code splitting) - I am working to fix this

### Deprecated

### Removed
- Key only format for `use`ing the plugin; you must include your Google API key inside an options object. e.g. `use(gmaps, { key: YOUR_KEY })`

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