<template>
  <div class="fb-login">
    <div class="user-alert">
      <h1>Ready to get your life back?</h1>
      <p>Sometimes facebook will delete your cookies on accident</p>
      <p>Don't worry, this will only take a sec.</p>
    </div>
    <VFacebookLogin
      class="login-button"
      :app-id="$env.app_id"
      scope="name, email, id, picture, user_events, user_photos"
      version="v3.2"
      @login="loggedIn"
      @sdk-init="haveSdk"
    />
  </div>
</template>

<script>
import VFacebookLogin from "vue-facebook-login-component";
import throttle from "lodash/throttle";
export default {
  components: {
    VFacebookLogin
  },
  methods: {
    async loggedIn() {
      throttle(
        () =>
          window.FB.login(() => {}, {
            scope: "user_posts, user_photos, user_events, instagram_basic"
          }),
        10 * 1000
      );
      await this.$store.dispatch("facebook/setUserLoggedIn");
      this.$router.push("/dashboard");
    },
    async haveSdk({ FB }) {
      await this.$store.dispatch("facebook/getUserInfo");
    }
  }
};
</script>
<style lang="stylus" scoped>
.fb-login {
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  text-align: center;
  p {
    margin-top: 0;
    margin-bottom: 0;
  }

  .user-alert {
    margin-bottom: 2rem;
  }
}
.login-button {
  width: 25%;
  margin: auto;
}
</style>
