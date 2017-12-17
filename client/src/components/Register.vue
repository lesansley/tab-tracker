<template>
  <div class="register">
    <h1>Register</h1>
    <form @submit.prevent="register">
      <div>
        <input
            type="email"
            name="email"
            v-model="email"
            placeholder="email"
        />
      </div>
      <div>
        <input
            type="password"
            name="password"
            v-model="password"
            placeholder="password"
        />
      </div>
      <div>
          <button>Register</button>
      </div>
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
