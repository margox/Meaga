const Config = require('electron-config')

module.exports = new Config({
  defaults: {
    mainWindowState: {
      width: 600,
      height: 580,
      x: undefined,
      y: undefined
    }
  }
})