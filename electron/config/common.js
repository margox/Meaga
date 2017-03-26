const path = require('path')
const profile = require('./profile')
const packageInfo = require(path.resolve(__dirname, '../package.json'))
const mainWindowState = profile.get('mainWindowState')

let mainWindow = {
  width: mainWindowState.width,
  height: mainWindowState.height,
  x: mainWindowState.x,
  y: mainWindowState.y,
  minWidth: 500,
  minHeight: 480,
  frame: false,
  vibrancy: 'dark',
  icon: path.resolve(__dirname, '../static/images/app_icon.icns'),
  // hasShadow: false,
  resizable: true,
  webPreferences: {
    webSecurity: false,
    defaultEncoding: 'UTF-8'
  }
}

let trayWindow = {
  width: 240,
  height: 310,
  y: -10,
  frame: false,
  vibrancy: 'dark',
  hasShadow: false,
  enableLargerThanScreen: true,
  resizable: false,
  movable: false,
  minimizable: false,
  maximizable: false,
  closeable: false,
  alwaysOnTop: true,
  fullscreenable: false,
  show: false,
  webPreferences: {
    // devTools: false,
    webSecurity: false
  }
}

let communication = {
  trayChannel: 'tray-channel',
  mainChannel: 'main-channel'
}

let trayIcon = path.resolve(__dirname, '../static/images/tray_icon.png')

module.exports = { communication, profile, mainWindow, trayWindow, trayIcon, packageInfo }