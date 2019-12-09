<template>
  <div>
    <FBLogin v-if="!FBLoggedIn || !hasSDK" />
    <UserDashboard v-else />
  </div>
</template>
<script>
import FBLogin from "@/components/FBLogin";
import UserDashboard from "@/components/UserDashboard";
import { mapGetters } from "vuex";
export default {
  middleware: ["auth"],
  components: {
    FBLogin,
    UserDashboard
  },
  computed: {
    ...mapGetters("facebook", ["FBLoggedIn"]),
    hasSDK: () => !!window.FB
  }
};
</script>
<style lang="stylus" scoped>

</style>
