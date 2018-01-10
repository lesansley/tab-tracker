<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <div class="elevation-2 white">
        <v-toolbar flat dense color="cyan" dark>
          <v-toolbar-title>Log in</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pb-2">
          <v-form @submit.prevent="login">
            <v-text-field type="email" name="email" label="Email" v-model="email" required></v-text-field>
            <v-text-field type="password" name="password" label="Password" v-model="password" required></v-text-field>
            <div class="error" v-html="error"></div>
            <v-btn @click="login" type="submit" color="cyan" dark>Log in</v-btn>
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
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        });
        this.$store.dispatch('setToken', response.data.token);
        this.$store.dispatch('setUser', response.data.user);
      } catch (err) {
        this.error = err.response.data.error;
      }
    }
  }
};
</script>

<style scoped>

</style>
