import Vuex from 'vuex'

const useStore = (Vue) => {

  Vue.use(Vuex)

  return new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
      tempStatus: {
        ready: false,
        playing: false,
        played: 0,
        duration: 1,
        importing: false,
        isFullScreen: false
      },
      status: {
        current: -1,
        volume: 0.7,
        muted: false,
        visualize: false,
        listType: 1,
        loopMode: 1
      },
      playlist: []
    },
    getters: {
      progress: (state) => {
        return state.tempStatus.played / state.tempStatus.duration
      }
    },
    mutations: {
      sync (state, data) {
        state.status = data.status
        state.playlist = data.playlist
      },
      setTempStatus (state, status) {
        state.tempStatus = { ...state.tempStatus, ...status }
      },
      addSong (state, song) {
        state.playlist = [ ...state.playlist, song ]
      },
      removeSong (state, id) {
        state.playlist = state.playlist.filter((item) => item.id !== id)
      },
      clear (state) {
        state.playlist = []
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
      setCurrent (state, current) {
        state.status = { ...state.status, current }
      },
      setListType (state, listType) {
        state.status = { ...state.status, listType }
      }
    },
    actions: {
      sync ({ commit }, data) {
        commit('sync', data)
      },
      setTempStatus ({ commit }, status) {
        commit('setTempStatus', status)
      },
      addSong ({ commit }, song) {
        commit('addSong', song)
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
      setCurrent ({ commit }, current) {
        commit('setCurrent', current)
      },
      setListType ({ commit }, listType) {
        commit('setListType', listType)
      }
    }
  })

}

export default useStore
