<template>
  <div class="albums-card">
    <div :style="{ backgroundImage: `url(${thumb})` }" class="image" @click="$router.push(`/albums/${id}`)" />
    <div class="info" @click="$router.push(`/albums/${id}`)">
      <p>{{ name }}</p>
    </div>
    <div class="button-container">
      <DownloadButton :url="thumb" text="Download Cover" class="download-cover" />
      <DownloadButton
        :urls="photos"
        :text="`Download All ${count} Photos`"
        :album-name="name"
        class="download-all"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "AlbumCard",
  props: {
    id: String,
    albumTitle: String,
    thumb: String,
    count: Number,
    name: String,
    photos: Array
  }
};
</script>
<style lang="stylus" scoped>
.image {
  height: 25vh;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
}
.albums-card {
  box-shadow: -2px 2px 12px -1px;
  height: auto;
  background-color: ui_offwhite;
  color: ui_black;
  overflow: hidden;
  border-radius: 4px;
  margin: 20px;

  &:hover {
    box-shadow: -2px 7px 12px -1px;
    transform: scale(1.025, 1.025);
  }
}
.info {
  text-align: center;
}
.button-container {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  .download-cover {
    order: 1
  }

  .download-all {
    order: 2
  }
}
</style>
