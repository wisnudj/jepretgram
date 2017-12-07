<template>
  <h1></h1>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
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
    ])
  },

  created () {
    this.getAllFoto()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
