import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jwt from 'jsonwebtoken'

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
    },

    setAddFoto: function (state, payload) {
      http.get('/api/foto/getall').then(({data}) => {
        state.fotos = data
      })
    },

    setdeletefoto: function (state, payload) {
      http.get('/api/foto/getall').then(({data}) => {
        state.fotos = data
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
    },

    addFoto: function ({commit}, newfoto) {
      var accesstoken = localStorage.getItem('access_token')
      var decoded = jwt.decode(accesstoken)
      http.post('/api/foto/create', {caption: newfoto.caption, urlimg: newfoto.urlimg, by: decoded._id}, {headers: {access_token: accesstoken}}).then(({data}) => {
        console.log(data)
        commit('setAddFoto', data)
      }).catch((err) => {
        console.log(err.message)
      })
    },

    hapusfoto: function ({commit}, foto) {
      console.log('ini foto', foto.by)
      var accesstoken = localStorage.getItem('access_token')
      var decoded = jwt.decode(accesstoken)
      console.log('ini decoded', decoded._id)
      if (decoded._id === foto.by._id) {
        http.delete('/api/foto/delete/' + foto._id).then(({data}) => {
          commit('setdeletefoto', data)
        }).catch((err) => {
          console.log(err)
        })
      } else {
        alert('ini bukan foto anda, anda tidak bisa menghapus')
      }
    }
  }
})
