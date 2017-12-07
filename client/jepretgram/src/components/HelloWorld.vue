<template>
  <div class="container">
    <button type="button" name="button" data-toggle="modal" data-target="#loginmodal">Login</button>
    <button type="button" name="button" data-toggle="modal" data-target="#registermodal">Register</button>
    <button type="button" name="button" v-on:click="logout">Logout</button>
    <button type="button" name="button" data-toggle="modal" data-target="#addmodal">Add</button>
    <div class="" v-for="foto in fotos">
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">{{foto.by.name}}</h5>
        </div>
        <img style="height: 200px; width: 100%; display: block;" :src="foto.urlimg" alt="Card image">
      </div>
      <div class="card">
        <div class="card-body">
          <p class="card-text">{{foto.caption}}</p>
          <p><small>Like {{foto.like.length}}</small></p>
          <button class="card-link" type="button" name="button" v-on:click="voteLike(foto._id)">Like</button>
          <button class="card-link" type="button" name="button">Edit</button>
          <button class="card-link" type="button" name="button" v-on:click="hapusfoto(foto)">Hapus</button>
        </div>
      </div>
    </div>

    <div class="modal fade" id="registermodal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Login</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <fieldset>
                <div class="form-group">
                  <label for="emailinput">Name</label>
                  <input type="text" class="form-control" id="emailinput" aria-describedby="emailHelp" placeholder="Masukkan name anda" v-model="newUser.name">
                  <small id="emailHelp" class="form-text text-muted"></small>
                </div>
                <div class="form-group">
                  <label for="emailinput">Email</label>
                  <input type="email" class="form-control" id="emailinput" aria-describedby="emailHelp" placeholder="Masukkan email anda" v-model="newUser.email">
                  <small id="emailHelp" class="form-text text-muted"></small>
                </div>
                <div class="form-group">
                  <label for="passwordinput">Password</label>
                  <input type="password" class="form-control" id="passwordinput" aria-describedby="emailHelp" placeholder="masukkan password" v-model="newUser.password">
                  <small id="emailHelp" class="form-text text-muted"></small>
                </div>
              </fieldset>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" v-on:click="register(newUser)" data-dismiss="modal">Register</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal login -->
      <div class="modal fade" id="loginmodal">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Register</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <fieldset>
                  <div class="form-group">
                    <label for="emailinput">Email</label>
                    <input type="email" class="form-control" id="emailinput" aria-describedby="emailHelp" placeholder="Masukkan email anda" v-model="user.email">
                    <small id="emailHelp" class="form-text text-muted"></small>
                  </div>
                  <div class="form-group">
                    <label for="passwordinput">Password</label>
                    <input type="password" class="form-control" id="passwordinput" aria-describedby="emailHelp" placeholder="masukkan password" v-model="user.password">
                    <small id="emailHelp" class="form-text text-muted"></small>
                  </div>
                </fieldset>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" v-on:click="login" data-dismiss="modal">Login</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal add -->
        <div class="modal fade" id="addmodal">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Add Foto</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form>
                  <fieldset>
                    <div class="form-group">
                      <label for="emailinput">Caption</label>
                      <input type="text" class="form-control" id="emailinput" aria-describedby="emailHelp" placeholder="Masukkan email anda" v-model="newfoto.caption">
                      <small id="emailHelp" class="form-text text-muted"></small>
                    </div>
                    <div class="form-group">
                      <label for="passwordinput">urlimg</label>
                      <input type="text" class="form-control" id="passwordinput" aria-describedby="emailHelp" placeholder="masukkan password" v-model="newfoto.urlimg">
                      <small id="emailHelp" class="form-text text-muted"></small>
                    </div>
                  </fieldset>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="addFoto(newfoto)">Add Foto</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      newUser: {
        name: '',
        email: '',
        password: ''
      },
      user: {
        email: '',
        password: ''
      },
      newfoto: {
        caption: '',
        urlimg: ''
      }
    }
  },

  computed: {
    ...mapState([
      'fotos'
    ])
  },

  methods: {
    ...mapActions([
      'getAllFoto',
      'voteLike',
      'addFoto',
      'hapusfoto'
    ]),

    register: function (populate) {
      axios.post('http://localhost:3000/api/user/signup', {
        name: populate.name,
        email: populate.email,
        password: populate.password
      }).then((response) => {
        this.newUser.name = ''
        this.newUser.email = ''
        this.newUser.password = ''
      })
    },

    login: function () {
      axios.post('http://localhost:3000/api/user/signin', {
        email: this.user.email,
        password: this.user.password
      }).then((response) => {
        console.log(response.data)
        localStorage.setItem('access_token', response.data.access_token)
        this.user.email = ''
        this.user.password = ''
        location.reload()
      })
    },

    logout: function () {
      localStorage.removeItem('access_token')
      location.reload()
    }
  },

  created () {
    this.getAllFoto()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  img {
    height: 600px;
  }
</style>
