<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <div class="elevation-2 white">
        <v-toolbar flat dense class="cyan" dark>
          <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pb-2">
          <form @submit.prevent="register">
            <input
              type="email"
              name="email"
              class="text"
              v-model="email"
              placeholder="email"
            />
            <br />
            <input
              type="password"
              name="password"
              class="text"
              v-model="password"
              placeholder="password"
            />
            <br />
            <div
              class="error"
              v-html="error"
            />
            <br />
            <input
              type="submit"
              class="v-btn cyan"
              value="Register"
            />
          </form>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService';
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    };
  },
  watch: {
    email (value) {
      console.log(value);
    }
  },
  methods: {
    async register () {
      try {
        await AuthenticationService.register({
          email: this.email,
          password: this.password
        });
      } catch (err) {
        this.error = err.response.data.error;
      }

    }
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .error {
    color: red;
  }
</style>
