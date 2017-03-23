const path = require('path')
const commonConfig = require('./common')

commonConfig.entry = 'file://' + path.resolve(__dirname, './../index.html')
module.exports = commonConfig