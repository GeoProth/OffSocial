<template>
  <div class="photo-card">
    <div v-if="image.type === 'image'">
      <div
        class="img"
        :style="{
          backgroundImage: `url(${url})`
        }"
      />
      <DownloadButton :url="url" />
    </div>
    <div v-if="image.type === 'video'">
      <video controls class="video" type="video/mp4">
        <source :src="url">
      </video>
      <DownloadButton :url="url" />
    </div>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  name: "PhotoCard",
  props: {
    image: Object,
    type: String
  },
  computed: {
    url() {
      console.log("url computation::image", this.image);
      if (this.image.type === "image") {
        return this.image.images.standard_resolution.url;
      }
      if (this.image.type === "video") {
        return this.image.videos.standard_resolution.url;
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.photo-card {
  height: fit-content;
  width: 90%;
  max-width: 640px;
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
    background-position: center;
    border-radius: 4px;
  }
  .video {
    width: 90%;
    max-width: 640px;
  }
}
</style>
