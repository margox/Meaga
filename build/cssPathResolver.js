module.exports = function (source) {
  var result = source
  if (process.env.NODE_ENV === 'production') {
    result = source.replace('__webpack_public_path__ + "static', '"..')
  }
  return result
}