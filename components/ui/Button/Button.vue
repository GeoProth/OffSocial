<template>
  <button class="ui-button" @click.prevent="clickAction">
    {{ text }}
  </button>
</template>
<script>
export default {
  name: "Button",
  props: {
    text: [String, Number],
    clickAction: {
      type: Function,
      default: () => null
    }
  }
};
</script>
<style lang="stylus" scoped>
  .ui-button {
    display: inline-block
    text-align: center
    vertical-align: middle
    border-radius: 0.5rem
    height: 2rem
    width: 5.5rem
    border: none
  }
  .ui-button:hover {
    cursor: pointer
  }
  .ui-button:active {
    outline: none
    border: none
  }
  .ui-button:focus { outline: 0 }
</style>
