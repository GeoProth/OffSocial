<template>
  <div class="body">
    <h1>Welcome to Delete My Digital Life!</h1>
    <h3>Log into your facebook by clicking the button below to get started</h3>
    <div>
      <VFacebookLogin
        app-id="ID GOES HERE"
        scope="name, email, id, picture, user_events, user_photos"
        version="v3.2"
        @login="loggedIn"
        @sdk-init="haveSdk"
      />
    </div>
  </div>
</template>

<script>
import VFacebookLogin from "vue-facebook-login-component";
import { mapGetters } from "vuex";
import throttle from "lodash/throttle";
export default {
  components: {
    VFacebookLogin
  },
  computed: {
    ...mapGetters("facebook", ["FB", "UserInfo", "UserPhotos", "UserEvents"])
  },
  methods: {
    async loggedIn({ authResponse }) {
      this.getPermissions();
      await this.$store.dispatch("facebook/getUserInfo");
      await this.$store.dispatch("facebook/setUserLogIn");
      this.$router.push("/info");
    },
    haveSdk({ FB }) {
      /* eslint-disable no-console */
      window.FB = global.FB = FB;
    },
    getPermissions() {
      // Only login once, don't allow the user to keep retrying while we wait for a response
      throttle(() => window.FB.login(() => {}, { scope: "user_posts, user_photos, user_events, instagram_basic" }), 10 * 1000);
    }
  }
};
</script>
