const commonConfig = require('./common')
const webpackConfig = require('../../config')

commonConfig.entry = 'http://localhost:' + webpackConfig.dev.port
module.exports = commonConfig