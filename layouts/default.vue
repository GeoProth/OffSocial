<template>
  <div class="container">
    <Header />
    <div class="layout-content">
      <SideNav v-if="showSideNav" class="layout-side-nav" />
      <div class="layout-main-content">
        <transition name="fade" style="animation-duration: 0.2s">
          <nuxt />
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header";
import SideNav from "@/components/SideNav";
import { mapGetters } from "vuex";

export default {
  components: { Header, SideNav },
  computed: {
    ...mapGetters("layout", ["showSideNav"])
  }
};
</script>
<style lang="stylus" scoped>
@import "mixins.styl"
.container,
.layout-content {
  display: flex
}
.container {
  flex-direction: column
  font-size: 1.2rem
}
.layout-content {
  flex: 1
}
.layout-main-content {
  width: 100%
  height: calc(100vh - 3.5rem)
}
</style>
