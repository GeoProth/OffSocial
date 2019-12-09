<template>
  <div
    v-if="type === 'error'"
    class="error-msg"
  >
    <h3 v-if="title">
      {{ title }}
    </h3>
    <p>{{ message }}</p>
  </div>
</template>
<script>
export default {
  name: "Message",
  props: {
    type: String,
    title: String,
    message: String
  }
};
</script>
<style lang="stylus" scoped>
.error-msg {
  width: 200px
  margin: auto
  border: 1px solid red
  border-radius: 4px
  background-color: lightpink
  font-size: 15px
  color: crimson
  text-align: center
  p {
    margin: 0
    padding: 0.5rem 0.5rem
  }
}
</style>
