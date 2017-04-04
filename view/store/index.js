import Vuex from 'vuex'

export const defaultState = {
  tempStatus: {
    ready: false,
    playing: false,
    played: 0,
    duration: 1,
    importing: false,
    isFullScreen: false
  },
  status: {
    currentSongId: -1,
    currentPlaylist: {
      type: 'playlist',
      value: 1
    },
    currentMenu: {
      type: 'playlist',
      value: 1
    },
    volume: 0.7,
    muted: false,
    visualize: false,
    loopMode: 1
  },
  filters: {
    artils: null,
    album: null,
    keyword: null
  },
  songs: [],
  playlists: [
    {
      name: 'All Songs',
      id: 1,
      type: 'all',
      removeable: false
    },
    {
      name: 'Default',
      id: 2,
      type: 'playlist',
      removeable: false,
      items: []
    },
    {
      name: 'Favorites',
      id: 3,
      type: 'favorites',
      removeable: false
    }
  ]
}

const useStore = (Vue) => {

  Vue.use(Vuex)

  return new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: defaultState,
    getters: {
      progress: (state) => {
        return state.tempStatus.played / state.tempStatus.duration
      },
      currentSong: (state, getters) => {
        return state.songs.find(item => item.id === state.status.currentSongId) || {}
      },
      currentPlaylist: (state) => {

        let { currentPlaylist } = state.status
        let playlist = {}
        let items = []

        if (currentPlaylist.type === 'artist') {
          playlist = {
            'type': 'artist',
            'name': currentPlaylist.value
          }
          items = state.songs.filter(item => item.metas.artist === currentPlaylist.value)
        } else if (currentPlaylist.type === 'album') {
          playlist = {
            'type': 'album',
            'name': currentPlaylist.value
          }
          items = state.songs.filter(item => item.metas.album === currentPlaylist.value)
        } else {
          playlist = state.playlists.find((item) => item.id === currentPlaylist.value)
          if (playlist.type === 'all') {
            items = state.songs
          } else if (playlist.type === 'favorites') {
            items = state.songs.filter(item => item.favorite)
          } else {
            items = state.songs.filter(item => playlist.items.indexOf(item.id) !== -1)
          }
        }

        return { ...playlist, items }

      },
      currentDisplayList: (state, getters) => {

        let { playlists } = state
        let { type, value } = state.status.currentMenu
        let playlist = {}
        let items = []

        if (type === 'playlist' || type === 'favorites' || type === 'all') {

          playlist = playlists.find(item => item.id === value)

          if (playlist.type === 'all') {
            items = state.songs
          } else if (playlist.type === 'favorites') {
            items = state.songs.filter(item => item.favorite)
          } else {
            items = state.songs.filter(item => playlist.items.indexOf(item.id) !== -1)
          }

          return {
            ...playlist,
            items,
            type: 'playlist'
          }

        } else if (type === 'artists') {
          return {
            items: getters.artists,
            type: 'artists'
          }
        } else if (type === 'albums') {
          return {
            items: getters.albums,
            type: 'albums'
          }
        } else if (type === 'artist') {
          return {
            items: state.songs.filter(item => item.metas.artist === value),
            type: 'artist',
            name: value
          }
        } else if (type === 'album') {
          return {
            items: state.songs.filter(item => item.metas.album === value),
            type: 'album',
            name: value
          }
        }

      },
      artists: (state) => {

        let artists = state.songs.reduce((prev, current, index, array) => {
          !prev[current.metas.artist] ? prev[current.metas.artist] = 1 : prev[current.metas.artist] += 1
          return prev
        }, {})

        return Object.keys(artists).map(item => {
          return {
            name: item,
            count: artists[item]
          }
        })

      },
      albums: (state) => {

        let albums = state.songs.reduce((prev, current, index, array) => {
          !prev[current.metas.album] ? prev[current.metas.album] = 1 : prev[current.metas.album] += 1
          return prev
        }, {})

        return Object.keys(albums).map(item => {
          return {
            name: item,
            count: albums[item]
          }
        })

      }
    },
    mutations: {
      sync (state, data) {
        state.status = data.status
        state.filters = data.filters
        state.songs = data.songs
        state.playlists = data.playlists
      },
      setTempStatus (state, status) {
        state.tempStatus = { ...state.tempStatus, ...status }
      },
      setStatus (state, status) {
        state.status = { ...state.status, ...status }
      },
      setCurrentPlaylist (state, currentPlaylist) {
        state.status = { ...state.status, currentPlaylist }
      },
      setCurrentSongId (state, id) {
        state.status = { ...state.status, currentSongId: id }
      },
      setCurrentMenu (state, currentMenu) {
        state.status = { ...state.status, currentMenu }
      },
      setFilters (state, filters) {
        state.filters = { ...state.filters, ...filters }
      },
      addSong (state, { song, playlistId }) {

        state.songs = [ ...state.songs, song ]
        ;(playlistId === 1 || playlistId === 3 || isNaN(playlistId)) && (playlistId = 2)
        if (playlistId) {
          let playlists = [ ...state.playlists ].map(playlist => {
            return playlist.id === playlistId ? {
              ...playlist,
              items: [ ...playlist.items, song.id ]
            } : playlist
          })
          state.playlists = playlists
        }

      },
      removeSong (state, id) {
        state.songs = state.songs.filter((item) => item.id !== id)
      },
      clear (state) {
        state.songs = []
      },
      setVolume (state, volume) {
        state.status = { ...state.status, volume }
      },
      setMuted (state, muted) {
        state.status = { ...state.status, muted }
      },
      visualize (state, visualize) {
        state.status = { ...state.status, visualize }
      },
      setLoopMode (state, loopMode) {
        state.status = { ...state.status, loopMode }
      },
      setFavorite (state, { id, favorite }) {
        state.songs = [ ...state.songs ].map((item) => {
          return item.id === id ? { ...item, favorite } : item
        })
      }
    },
    actions: {
      sync ({ commit }, data) {
        commit('sync', data)
      },
      setTempStatus ({ commit }, status) {
        commit('setTempStatus', status)
      },
      setStatus ({ commit }, status) {
        commit('setStatus', status)
      },
      setCurrentPlaylist ({ commit }, data) {
        commit('setCurrentPlaylist', data)
      },
      setCurrentSongId ({ commit }, id) {
        commit('setCurrentSongId', id)
      },
      setCurrentMenu ({ commit }, data) {
        commit('setCurrentMenu', data)
      },
      setFilters ({ commit }, filters) {
        commit('setFilters', filters)
      },
      addSong ({ commit }, payload) {
        commit('addSong', payload)
      },
      removeSong ({ commit }, id) {
        commit('removeSong', id)
      },
      clear ({ commit }) {
        commit('clear')
      },
      setVolume ({ commit }, volume) {
        commit('setVolume', volume)
      },
      setMuted ({ commit }, muted) {
        commit('setMuted', muted)
      },
      visualize ({ commit }, visualize) {
        commit('visualize', visualize)
      },
      setLoopMode ({ commit }, loopMode) {
        commit('setLoopMode', loopMode)
      },
      setFavorite ({ commit }, param) {
        commit('setFavorite', param)
      }
    }
  })

}

export default useStore
