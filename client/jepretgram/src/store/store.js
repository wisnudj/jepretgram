import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3000'
})

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    fotos: [],
    foto: ''
  },

  mutations: {

    setAllFoto: function (state, payload) {
      state.fotos = payload
    },

    setVoteLike: function (state, payload) {
      state.fotos.forEach((foto, index) => {
        if (foto._id === payload._id) {
          state.fotos[index].like = payload.like
        }
      })
    }

  },

  actions: {
    getAllFoto: function ({commit}) {
      http.get('/api/foto/getall').then(({data}) => {
        commit('setAllFoto', data)
      })
    },

    voteLike: function ({commit}, fotoid) {
      var dami = {
        title: 'dami'
      }
      var accesstoken = localStorage.getItem('access_token')
      http.put('/api/foto/like/' + fotoid, dami, {headers: {access_token: accesstoken}}).then(({data}) => {
        commit('setVoteLike', data)
        console.log(data)
      }).catch(err => {
        console.log(err.message)
      })
    }
  }
})
