const path = require('path')
const commonConfig = require('./common')

commonConfig.mainWindowEntry = 'file://' + path.resolve(__dirname, '../index.html')
commonConfig.trayWindowEntry = 'file://' + path.resolve(__dirname, '../tray.html')
module.exports = commonConfig