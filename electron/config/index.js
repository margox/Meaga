const webpackConfig = require('../../config')

module.exports = {
  mainWindow: {
    width: 800,
    height: 580,
    minWidth: 500,
    minHeight: 480,
    frame: false,
    vibrancy: "dark",
    icon: "./static/images/app_icon.icns",
    hasShadow: false,
    resizable: true,
    webPreferences: {
      webSecurity: false,
      defaultEncoding: "UTF-8"
    }
  },
  entry: 'http://localhost:' + webpackConfig.dev.port
}