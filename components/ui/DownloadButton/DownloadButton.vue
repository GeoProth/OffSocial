<template>
  <div class="download-btn" @click.prevent="get()">
    <p>{{ text }} <i v-if="loading" class="fa fa-spinner fast-spin" /></p>
  </div>
</template>
<script>
/* eslint-disable */
import * as Download from "downloadjs";
import * as JSZip from "jszip";
export default {
  name: "DownloadButton",
  data: () => ({
    loading: false,
  }),
  props: {
    url: String,
    urls: Array,
    albumName: String,
    text: {
      type: String,
      default: "Download"
    }
  },
  methods: {
    async get() {
      if (this.url) {
        this.loading = true;
        Download(this.url);
        this.loading = false;
      }
      if (this.urls) {
        this.loading = true;
        const zip = new JSZip();
        const getFile = url =>
          this.$axios
            .get(url, { responseType: "blob" })
            .then(({ data }) => data);
        await Promise.all(
          this.urls.map(async url => {
            return zip.file(
              url.split('/').filter(url => url.includes('.jpg'))[0].split('?')[0],
              getFile(url),
              { binary: true }
            );
          })
        );

        const finalZip = await zip.generateAsync({ type: "blob" });
        this.loading = false;
        Download(finalZip, this.albumName || "download.zip", "application/zip");
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.download-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: ui_blue;
  margin: 0.2rem;
  padding: 12px;
  font-size: 15px;
  color: ui_white;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: darken(ui_blue, 10%);
  }
  p {
    margin: 0;
  }
}
.fast-spin {
  animation: fa-spin 1.25s infinite linear;
}
</style>
