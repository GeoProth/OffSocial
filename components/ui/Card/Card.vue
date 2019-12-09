<template>
  <div class="ui-card">
    <slot />
  </div>
</template>
<script>
export default {
  name: "Card"
};
</script>
<style lang="stylus" scoped>
.ui-card {
  border-radius: 0.5rem
  background-color: #fafbfc
  color: black
  text-align: center
  input {
    appearance: none;
    margin: 0 1.5rem;
    height: 3.5rem;
    padding: 0.5rem 1.5rem;
    border-radius: 0.5rem;
    outline: none;
    border: none;
    background: #e8ebed;
  }
}
</style>
