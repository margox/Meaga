const path = require('path')

module.exports = {
  mainWindow: {
    width: 800,
    height: 580,
    minWidth: 500,
    minHeight: 480,
    frame: false,
    vibrancy: "dark",
    hasShadow: false,
    icon: "./static/images/app_icon.icns",
    resizable: true,
    webPreferences: {
      devTools: true,
      webSecurity: false,
      defaultEncoding: "UTF-8"
    }
  },
  entry: 'file://' + path.resolve(__dirname, './../index.html')
}