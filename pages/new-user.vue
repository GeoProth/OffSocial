<template>
  <div>
    <Card class="new-account-card">
      <h1>Create an account</h1>
      <input v-model="email" placeholder="Email" type="text" @keyup.enter="createUser({email, password})">
      <input v-model="password" placeholder="Password" type="password" @keyup.enter="createUser({email, password})">
      <transition name="fadeIn">
        <div v-if="error" class="error-message">
          <p>{{ error }}</p>
        </div>
      </transition>
      <Button
        :click-action="() => createUser({email, password})"
        text="Submit"
      />
    </Card>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  name: "NewUser",
  data: () => ({
    email: "",
    password: "",
    error: ""
  }),
  methods: {
    async createUser(credentials) {
      if (this.error) {
        this.error = "";
      }
      try {
        await this.$store.dispatch('user/createUser', credentials);
      } catch (e) {
        this.error = e.message
      };
    }
  }
};
</script>
<style lang="stylus" scoped>
.new-account-card {
  height: calc(75vh - 2rem)
  width: 85%
  +lg() {
    width: 65%
  }
  +xxl() {
    width: 35%
  }
  margin-left: auto
  margin-right: auto
  margin-top: 2.5rem
  h1 {
    padding-top: 2rem
  }
  input {
    width: 75%
    margin-top: 2rem
    margin-left: 12.5%
    margin-right: 12.5%
    +sm() {
      width: 50%
      margin-left: 25%
      margin-right: 25%
    }
    +md() {
      width: 50%
      margin-left: 25%
      margin-right: 25%
    }
    +lg() {
      width: 50%
      margin-left: 25%
      margin-right: 25%
    }
    +xl() {
      width: 50%
      margin-left: 25%
      margin-right: 25%
    }
    +xxl() {
      width: 35%
      margin-left: 32.5%
      margin-right: 32.5%

    }
  }

  button {
    margin-top: 2rem
    background-color: ui_blue
    color: ui_white
    height: 3.5rem
    width: 7.5rem
  }
}
.error-message {
  width: 75%
  height: 3.5rem
  margin-top: 2rem
  margin-left: auto
  margin-right: auto
  background-color: pink
  color: red
  border: red solid 1px
  border-radius: 0.25rem

  p {
    margin-top: 2.5%
  }
}
</style>
