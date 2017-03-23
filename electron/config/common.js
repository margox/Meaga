const path = require('path')

module.exports = {
  mainWindow: {
    width: 800,
    height: 580,
    minWidth: 500,
    minHeight: 480,
    frame: false,
    vibrancy: 'dark',
    icon: path.resolve(__dirname, '../static/images/app_icon.icns'),
    hasShadow: false,
    resizable: true,
    webPreferences: {
      webSecurity: false,
      defaultEncoding: 'UTF-8'
    }
  },
  trayWindow: {
    width: 240,
    height: 320,
    frame: false,
    vibrancy: 'dark',
    resizable: false,
    movable: false,
    minimizable: false,
    maximizable: false,
    closeable: false,
    alwaysOnTop: true,
    fullscreenable: false,
    show: false,
    webPreferences: {
      devTools: false,
      webSecurity: false
    }
  },
  trayIcon: path.resolve(__dirname, '../static/images/tray_icon.png')
}