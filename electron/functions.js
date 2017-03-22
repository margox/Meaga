const fs = require('fs')
const os = require('os')
const path = require('path')
const jsmediatags = require('jsmediatags')

const cacheDir = path.resolve(os.homedir(), './Music/Vuelec')
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

  readAudioTags (path) {

    return new Promise((resolve, reject) => {
      new jsmediatags.Reader(path)
      .setTagsToRead(['title', 'artist', 'album', 'picture'])
      .read({
        onSuccess: (tag) => {
          this.cacheAlbumCover(tag.tags.album, tag.tags.picture, (cover, error) => {
            let tags = tag.tags
            tags.cover = error ? null : cover
            resolve(tags)
          })
        },
        onError: (error) => {
          reject(error)
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