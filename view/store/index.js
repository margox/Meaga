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
        duration: 0,
        importing: false
      },
      status: {
        index: 0,
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
      removeSong (state, index) {
        let playlist = [ ...state.playlist ]
        playlist.splice(index, 1)
        state.playlist = playlist
      },
      changeVolume (state, volume) {
        state.status = { ...state.status, volume }
      },
      setMuted (state, muted) {
        state.status = { ...state.status, muted }
      },
      visualize (state, visualize) {
        state.status = { ...state.status, visualize }
      },
      changeLoopMode (state, loopMode) {
        state.status = { ...state.status, loopMode }
      },
      changeIndex (state, index) {
        state.status = { ...state.status, index }
      },
      changeListType (state, listType) {
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
      changeVolume ({ commit }, volume) {
        commit('changeVolume', volume)
      },
      setMuted ({ commit }, muted) {
        commit('setMuted', muted)
      },
      visualize ({ commit }, visualize) {
        commit('visualize', visualize)
      },
      changeLoopMode ({ commit }, loopMode) {
        commit('changeLoopMode', loopMode)
      },
      changeIndex ({ commit }, index) {
        commit('changeIndex', index)
      },
      changeListType ({ commit }, listType) {
        commit('changeListType', listType)
      }
    }
  })

}

export default useStore
