import Vuex from 'vuex'

const useStore = (Vue) => {
  Vue.use(Vuex)
  return new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
      status: {
        index: 0,
        volume: 0.7,
        listType: 1,
        loopMode: 1
      },
      playlist: []
    },
    mutations: {
      sync (state, data) {
        state.status = data.status
        state.playlist = data.playlist
      },
      addSong (state, song) {
        state.playlist = [ ...state.playlist, song ]
      },
      removeSong (state, id) {
        state.playlist = state.playlist.filter((item) => item.id !== id)
      },
      changeVolume (state, volume) {
        state.status = { ...state.status, volume }
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
      addSong ({ commit }, song) {
        commit('addSong', song)
      },
      removeSong ({ commit }, id) {
        commit('removeSong', id)
      },
      changeVolume ({ commit }, volume) {
        commit('changeVolume', volume)
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
