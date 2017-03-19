import metaParser from '@/helpers/metaParser'

export default {

  initializeDropEvent () {

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

  },

  selectLocalFiles () {

    // show local-files selector dialog.
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
    // get old playlist
    let playlist = window.store.state.playlist
    // map data to playlist items
    let selectSongs = data.map((item, index) => {
      // generate an random string and ust it as the id of the song.
      let id = new Date().getTime() + '_' + index + '_' + Math.ceil(1000 + 9999 * Math.random())
      return {
        id: id,
        src: item
      }
    }).filter((item) => {
      // remove items that has already existed in the playlist
      return playlist.findIndex((subItem) => subItem.src === 'file://' + item.src) === -1
    })
    // fetch ids tags of each items
    this.syncSongsMetas(selectSongs, 0)

  },

  syncSongsMetas (songs, index = 0) {

    if (index < songs.length) {
      metaParser.readAudioTags(songs[index].src).then((tags) => {
        // continue next
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
        // continue next
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
