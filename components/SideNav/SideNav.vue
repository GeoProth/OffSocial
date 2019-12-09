<template>
  <div class="side-nav-container">
    <div class="dashboard" @click="route('/dashboard')">
      <h3>Dashboard</h3>
    </div>
    <div class="privacy" @click="route('/privacy')">
      <h3>Privacy Policy</h3>
    </div>
    <div class="terms" @click="route('/terms')">
      <h3>Terms</h3>
    </div>
  </div>
</template>
<script>
export default {
  name: "SideNav",
  methods: {
    route(link) {
      this.$store.dispatch("layout/toggleSideNav");
      this.$router.push(link);
    }
  }
};
</script>
<style lang="stylus" scoped>
.side-nav-container {
  width: 12rem;
  background-color: darken(white, 20%);

  div {
    height: 3rem;
    padding: 2.5px;
    border: 1px solid lighten(ui_blue, 20%);
    background-color: lighten(ui_blue, 10%);
    color: ui_offwhite;
    display: flex;
    justify-content: center;
    flex-direction: column;
    cursor: pointer;
    &:hover {
      background-color: ui_blue;
    }
  }
  a {
    text-decoration: none;
    color: ui_white;
    vertical-align: -50%;
  }
  h3 {
    margin: 0
    text-align: center
    font-size: 1rem

  }
}
.side-nav-container div {
  width: 100%
}
</style>
