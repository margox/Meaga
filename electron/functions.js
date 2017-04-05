const fs = require('fs')
const os = require('os')
const path = require('path')
const jsmediatags = require('jsmediatags')
const packageInfo = require('./package.json')

const cacheDir = path.resolve(os.homedir(), './Music/' + packageInfo.name)
const albumDir = path.resolve(cacheDir, './albums')
const lyricDir = path.resolve(cacheDir, './lyrics')
const artistDir = path.resolve(cacheDir, './artists')

if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir)
}

if (!fs.existsSync(albumDir)) {
  fs.mkdirSync(albumDir)
}

if (!fs.existsSync(lyricDir)) {
  fs.mkdirSync(lyricDir)
}

if (!fs.existsSync(artistDir)) {
  fs.mkdirSync(artistDir)
}

module.exports = {

  readAudioTags (filePath) {

    return new Promise((resolve, reject) => {
      new jsmediatags.Reader(filePath)
      .setTagsToRead(['title', 'artist', 'album', 'picture'])
      .read({
        onSuccess: (tag) => {
          let { tags } = tag
          tags.album = tags.album.replace(/\#|\?|\&\/\\/g, '')
          this.cacheAlbumCover(tags.album, tag.tags.picture, (cover, error) => {
            tags.cover = error ? null : cover
            resolve(tags)
          })
        },
        onError: (error) => {
          reject({
            title: path.basename(filePath)
          }, error)
        }
      })
    })

  },

  cacheAlbumCover (album, picture, callback) {

    let cacheFilePath = path.resolve(albumDir, album + '.' + picture.format.split('/')[1])

    if (!fs.existsSync(cacheFilePath)) {
      let fileContent = this.convertPicture(picture)
      if (fileContent) {
        fs.writeFile(cacheFilePath, fileContent, 'binary', (error) => {
          callback(cacheFilePath, error)
        })
      } else {
        callback(null, true)
      }
    } else {
      callback(cacheFilePath)
    }

  },

  convertPicture(picture) {

    if (!picture) {
      return null
    } else {
      return picture.data.map((item) => String.fromCharCode(item)).join('')
    }

  }

}