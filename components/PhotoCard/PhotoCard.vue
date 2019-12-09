<template>
  <div class="photo-card">
    <div class="img" :style="{ backgroundImage: `url(${url})` }" />
    <DownloadButton :url="url" />
  </div>
</template>
<script>
export default {
  name: "PhotoCard",
  props: {
    url: String
  }
};
</script>
<style lang="stylus" scoped>
.photo-card {
  height: fit-content;
  width: 90%;
  border-radius: 4px;
  background-color: ui_gray;
  box-shadow: -2px 2px 12px -1px;
  margin-top: 2rem;
  margin-bottom: 2rem;
  margin-left: auto;
  margin-right: auto;
  &:hover {
    box-shadow: -5px 5px 12px -1px;
    transform: scale(1.025, 1.025);
  }
  .img {
    height: 20rem;
    background-position: top;
    border-radius: 4px;
  }

}
</style>
