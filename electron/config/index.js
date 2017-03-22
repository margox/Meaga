const webpackConfig = require('../../config')

module.exports = {
  mainWindow: {
    width: 800,
    height: 580,
    minWidth: 600,
    minHeight: 480,
    frame: false,
    vibrancy: "ultra-dark",
    icon: "./static/images/app_icon.png",
    resizable: true,
    maximizable: false,
    webPreferences: {
      webSecurity: false,
      defaultEncoding: "UTF-8"
    }
  },
  entry: 'http://localhost:' + webpackConfig.dev.port
}