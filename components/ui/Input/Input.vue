<template>
  <input
    class="ui-input"
    :type="type"
    :value="value"
    :placeholder="holder || ''"
    @input="$emit('input', $event.target.value)"
    @keyup.enter="$emit('enter', $event.target.value)"
  >
</template>
<script>
export default {
  props: {
    value: [Number, String],
    type: String,
    holder: String
  },
  data: () => ({
    valid: false
  }),
  methods: {
  }
};
</script>
<style lang="stylus" scoped>
.ui-input {
  outline: none
  margin:10px;
  box-sizing: border-box;
  border:1px solid rgba(0,0,0,0.05)
  padding:10px;
  width:200px;
  border-radius:4px;
  font-size:15px;
  box-shadow: 0px 0px 10px #ccc;
}
.invalid {
  border-color: red;
  background: lightpink;
}
</style>
