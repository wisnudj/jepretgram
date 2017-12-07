<template>
  <div class="container">
    <button type="button" name="button">Login</button>
    <button type="button" name="button" data-toggle="modal" data-target="#registermodal">Register</button>
    <button type="button" name="button">Logout</button>
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
          <button class="card-link" type="button" name="button">Like</button>
          <button class="card-link" type="button" name="button">Edit</button>
          <button class="card-link" type="button" name="button">Hapus</button>
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
      'getAllFoto'
    ]),

    register: function (populate) {
      axios.post('/api/user/signup', {
        name: populate.name,
        email: populate.email,
        password: populate.password
      }).then((response) => {
        this.newUser.name = ''
        this.newUser.email = ''
        this.newUser.password = ''
      })
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
