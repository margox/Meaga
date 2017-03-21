export default {

  initialize () {

    if (window.fileImporter) {
      return false
    }

    document.addEventListener('dragover', (e) => {
      e.preventDefault()
    })

    document.body.addEventListener('drop', (e) => {

      let files = e.dataTransfer.files

      if (files.length) {
        files = Array.prototype.slice.call(files)
        files = files.filter((item) => item.type === 'audio/mp3').map((item) => item.path)
        this.importLocalFiles(files)
      }

      e.preventDefault()

    })

    window.fileImporter = this

  },

  selectLocalFiles () {

    window.electron.remote.dialog.showOpenDialog({
      title: 'Import Audio Files',
      properties: ['openFile', 'multiSelections'],
      filters: [{
        name: '.MP3 Files',
        extensions: ['mp3']
      }]
    }, (data) => {
      this.importLocalFiles(data)
    })

  },

  importLocalFiles (data) {

    if (!data || !(data instanceof Array)) {
      return false
    }

    let playlist = window.store.state.playlist
    let selectSongs = data.map((item, index) => {
      let id = new Date().getTime() + '_' + index + '_' + Math.ceil(1000 + 9999 * Math.random())
      return {
        id: id,
        src: item
      }
    }).filter((item) => {
      return playlist.findIndex((subItem) => subItem.src === 'file://' + item.src) === -1
    })

    this.syncSongsMetas(selectSongs, 0)

  },

  syncSongsMetas (songs, index = 0) {

    if (index < songs.length) {

      window.remoteFunctions.readAudioTags(songs[index].src).then((tags) => {

        this.syncSongsMetas(songs, index + 1)

        window.store.dispatch('addSong', {
          id: songs[index].id,
          name: tags.title,
          src: 'file://' + songs[index].src,
          metas: {
            artist: tags.artist,
            album: tags.album,
            cover: 'file://' + tags.cover
          }
        })

      }).catch(() => {

        this.syncSongsMetas(songs, index + 1)

        window.store.dispatch('addSong', {
          id: songs[index].id,
          name: null,
          src: 'file://' + songs[index].src,
          metas: {
            artist: null,
            album: null,
            cover: null
          }
        })

      })

    }

  }

}
