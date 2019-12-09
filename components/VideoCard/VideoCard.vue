<template>
  <div class="video-card">
    <video controls class="video" type="video/mp4">
      <source :src="url">
    </video>
    <h3>{{ name }}</h3>
    <DownloadButton :url="url" />
  </div>
</template>
<script>
export default {
  name: "VideoCard",
  props: {
    url: String,
    name: String
  }
};
</script>
<style lang="stylus" scoped>
.video-card {
  height: fit-content;
  width: fit-content;
  margin-top: 2rem;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2rem;
  align-self: center;
  box-shadow: -2px 2px 12px -1px;
  border-radius: 4px;
  text-align: center;

  &:hover {
    box-shadow: -2px 7px 12px -1px;
    transform: scale(1.025, 1.025);
  }

  .video {
    width: 100%;
    border-radius: 4px;
    outline: none;
  }
}
</style>
