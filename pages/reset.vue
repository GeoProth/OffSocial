<template>
  <Card class="password-reset-card">
    <h1>
      Set a new password for your account
    </h1>
    <input v-model="password" class="password-input" placeholder="password" type="password" @keyup.enter="submit">
    <Button
      class="password-reset-submit"
      text="submit"
      :click-action="() => submit()"
    />
  </Card>
</template>
<script>
/* eslint-disable */
import { mapActions } from 'vuex';
export default {
  data: () => ({
    password: '',
    email: '',
    resetCode: ''
  }),
  methods: {
    submit() {
      this.$store.dispatch('user/finishResetPassword', {
        password: this.password,
        email: this.email,
        resetCode: this.resetCode
      });
    }
  },
  beforeMount() {
    if (!this.$route.query.hasOwnProperty('r') && !this.route.query.hasOwnProperty('e')) {
      return this.$router.replace('/');
    }
    this.email = this.$route.query.e;
    this.resetCode = this.$route.query.r;
  }
};
</script>
<style lang="stylus" scoped>
.password-reset-card {
  height: 95%
  width: 90%
  margin-top: 5%
  margin-left: auto
  margin-right: auto

  h1 {
    padding-left: 2rem
    padding-right: 2rem
  }

  input {
    margin-left: auto
    margin-right: auto
  }
}
.password-reset-submit {
  width: 7.5rem
  height: 3rem
  margin-top: 1.5rem
  background-color: ui_blue
  color: ui_white
}
</style>
