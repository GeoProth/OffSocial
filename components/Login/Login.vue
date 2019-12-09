<template>
  <div class="login-form">
    <h1>Login</h1>
    <Message
      v-if="error.hasOwnProperty('message')"
      :message="error.message"
      class="error-message"
      type="error"
    />
    <Input
      v-model="username"
      class="username-input"
      holder="username"
      @enter="login({ username, password })"
    />
    <p />
    <Input
      v-model="password"
      holder="password"
      type="password"
      @enter="login({ username, password })"
    />
    <nuxt-link to="/new-user" class="new-user-link">
      <p>Don't have an account?</p>
    </nuxt-link>
    <nuxt-link to="/reset-password" class="reset-password-link">
      <p>Forgot your password?</p>
    </nuxt-link>
    <button
      text="Submit"
      class="login-form-submit"
      @click="login({ username, password })"
    >
      Submit
    </button>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  name: 'Login',
  data: () => ({
    username: '',
    password: '',
    error: {}
  }),
  methods: {
    async login(creds) {
      try {
        await this.$store.dispatch('user/login', creds);
        this.$router.push('/dashboard');
      } catch (e) {
        this.error = { message: "We couldn't log you in" };
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.login-form {
  h1 {
    padding-top: 2rem
  }
  p {
    margin: 0
  }
  button {
      outline:none
      color: white;
      display: inline-block
      text-align: center
      vertical-align: middle
      border-radius: 0.5rem
      padding: 0.5rem 3rem
    :hover {
      cursor: pointer
    }
    :active {
      outline: none
      border: none
    }
    :focus { outline: 0 }
  }
}
.login-form-submit {
  margin-top: 1.5rem
  background-color: ui_blue
  color: ui_white
  font-size:15px
  padding: 5px 5px
}
.new-user-link, .reset-password-link {
  color: #000
  text-decoration: none
  p {
    margin-top: 0.5rem
    margin-bottom: 0.5rem
    font-size: 15px
  }
}

</style>
