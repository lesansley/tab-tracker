<template>
  <v-layout column>
    <v-flex
      xs6
      offset-xs3
    >
      <div class="elevation-2 white">
        <v-toolbar
          flat
          dense
          color="cyan"
          dark
        >
          <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pb-2">
          <v-form
            @submit.prevent="register"
          >
            <v-text-field
              type="email"
              name="email"
              label="Email"
              v-model="email"
              required
            ></v-text-field>
            <v-text-field
              type="password"
              name="password"
              label="Password"
              v-model="password"
              required
            ></v-text-field>
            <div
              class="error"
              v-html="error"
            ></div>
            <v-btn
              @click="register"
              type="submit"
              color="cyan"
              dark
            >Register</v-btn>
          </v-form>
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
