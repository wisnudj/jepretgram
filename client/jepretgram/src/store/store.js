import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import jwt from 'jsonwebtoken'

const http = axios.create({
  baseURL: 'http://localhost:3000'
})

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    fotos: [],
    foto: ''
  },

  mutation: {

    setAllFoto: function (state, payload) {
      state.fotos = payload
    }

  },

  actions: {
    getAllFoto: function ({commit}) {
      http.get('/api/foto/getall').then(({data}) => {
        commit('setAllFoto', data)
      })
    }
  }
})
