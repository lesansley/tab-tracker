<template>
  <div class="register">
    <h1>Register</h1>
    <form @submit.prevent="register">
      <input
        type="email"
        name="email"
        class="text"
        v-model="email"
        placeholder="email"
      />
      <input
        type="password"
        name="password"
        class="text"
        v-model="password"
        placeholder="password"
      />
      <input
        type="submit"
        class="button"
        value="Register"
      />
    </form>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService';
export default {
  data () {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async register () {
      await AuthenticationService.register({
        email: this.email,
        password: this.password
      });
    }
  },
  watch: {
    email (value) {
      console.log(value);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
