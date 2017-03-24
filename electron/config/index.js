const commonConfig = require('./common')
const webpackConfig = require('../../config')

commonConfig.mainWindowEntry = 'http://localhost:' + webpackConfig.dev.port + '/index.html'
commonConfig.trayWindowEntry = 'http://localhost:' + webpackConfig.dev.port + '/tray.html'
module.exports = commonConfig