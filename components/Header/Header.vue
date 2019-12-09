<template>
  <div class="main-header">
    <div v-if="isLoggedIn" class="menu" @click.prevent="toggleSideNav">
      <i class="fa fa-bars fa-lg" />
    </div>
    <div class="branding" @click="() => isLoggedIn ? $router.push('/info') : $router.push('/')">
      <h3>Delete My Digital Life</h3>
    </div>
    <div v-if="isLoggedIn" class="user">
      <i v-popover:logoutButton.bottom class="fa fa-user-circle-o fa-lg" />
      <popover name="logoutButton" :width="70">
        <div class="logout-popover" @click="logout">
          <p>Log out</p>
        </div>
      </popover>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Header",
  computed: {
    ...mapGetters("user", ["isLoggedIn"])
  },
  methods: {
    ...mapActions("layout", ["toggleSideNav"]),
    ...mapActions("user", ["logout"])
  }
};
</script>
<style lang="stylus" scoped>
.main-header {
  display: flex
  width: 100%;
  height: 3.5rem;
  flex-wrap: nowrap;
  align-items: center;
  box-shadow: 2px -2px 15px;
}
.menu {
  order: 1;
  margin-left: 1.5rem;
  i {
    vertical-align: -5%;
  }
}
.branding {
  order: 2;
  flex-grow: 3;
  text-align: center;
}
.user {
  order: 3;
  margin-right: 1.5rem;
  i {
    vertical-align: -5%;
  }
}
.logout-popover {
  height: 100%;
  width: 100%;
  text-align: center;
  color: ui_black;
  p {
    font-size: 1rem;
  }
}
</style>
