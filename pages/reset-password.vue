<template>
  <Card class="animated reset-password-card" :class="{ 'animated shake': error }">
    <h1>Reset your password</h1>
    <div>
      <input v-model="email" class="email-input" placeholder="email" type="text" @keyup.enter="resetPassword({ email })">
      <transition name="fadeIn">
        <div v-if="error" class="error">
          <p>{{ error }}</p>
        </div>
      </transition>
    </div>
    <Button :click-action="() => resetPassword({ email })" text="submit" />
  </Card>
</template>
<script>
export default {
  data: () => ({
    email: "",
    error: ""
  }),
  methods: {
    async resetPassword(value) {
      if (this.error) {
        this.error = "";
      }
      try {
        await this.$store.dispatch("user/resetPassword", value);
      } catch (e) {
        this.error = e.message;
      }
    }
  }
};
</script>
<style lang="stylus">
.reset-password-card {
  height: auto
  width: 95%
  margin-top: 5rem
  margin-left: auto
  margin-right: auto
  display: grid
  grid-template-row: 35% auto auto
  h1 {
    padding-left: 2rem
    padding-right: 2rem
  }
  input {
    width: 85%
    margin-left: auto !important
    margin-right: auto !important
  }

  button {
    background-color: #388e3c
    color: #eee
    height: 3rem !important
    width: 6rem !important
    margin-top: 2rem
    margin-left: auto
    margin-right: auto
    margin-bottom: 3rem
  }
  +sm() {
    width: 75%
    input {
      width: 65% !important
    }
  }
  +md() {
    width: 65%
    input {
      width: 50% !important
    }
  }
  +lg() {
    width: 50%
    input {
      width: 45% !important
    }
  }
  +xl() {
    width: 50%
    input {
      width: 45% !important
    }
  }
  +xxl() {
    width: 35%
    input {
      width: 45% !important
    }
  }
  .error {
    border-radius: 5px
    background-color: pink
    color: red
    width: 85%
    margin-left: auto
    margin-right: auto
    height: auto
    p {
      padding-top: 0.75rem
      padding-bottom: 0.75rem
      padding-left: 1rem
      padding-right: 1rem
    }
    +sm() {
      width: 65%
    }
    +md() {
      width: 50%
    }
    +lg() {
      width: 45%
    }
    +xl() {
      width: 45%
    }
    +xxl() {
      width: 45%
    }
  }
}
</style>
