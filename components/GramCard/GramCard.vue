<template>
  <nuxt-link to="/grams">
    <div class="gram-card">
      <div class="img" :style="{ backgroundImage: `url(${cover})` }" />
      <p class="info">
        Instagram Posts
      </p>
      <div class="button-container">
        <DownloadButton :url="cover" text="Download Cover" class="download-cover" />
        <DownloadButton
          :urls="grams"
          :text="`Download All ${count} Photos`"
          class="download-all"
        />
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  name: "GramCard",
  props: {
    id: String,
    thumb: String,
    cover: String,
    video: String,
    count: Number,
    grams: Array
  }
};
</script>
<style lang="stylus" scoped>
.gram-card {
  height: 45vh;
  width: 90%;
  border-radius: 4px;
  background-color: ui_gray;
  box-shadow: -2px 2px 12px -1px;
  margin-top: 1.5rem;
  margin-bottom: 2rem;
  margin-left: auto;
  margin-right: auto;
  &:hover {
    box-shadow: -5px 5px 12px -1px;
    transform: scale(1.025, 1.025);
  }
  .img {
    height: 13rem;
    background-position: top;
    border-radius: 4px;
  }
  .info {
    margin-top: 2rem;
  text-align: center;
}
.button-container {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left;

  .download-cover {
    order: 1
  }

  .download-all {
    order: 2
  }
}

}
</style>
