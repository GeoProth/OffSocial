<template>
  <div>
    <h1>{{ album.name }}</h1>
    <div class="grid">
      <PhotoCard
        v-for="(photo, index) in album.photos"
        :key="index"
        :url="photo.source"
      />
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import find from 'lodash/find';
import PhotoCard from '@/components/PhotoCard';
export default {
    name: 'AlbumId',
    components: { PhotoCard },
    asyncData({ params, store }) {
        const albums = store.getters['facebook/Albums'];
        const album = find(albums, { id: params.albumId });
        console.log("asyncData::albums", albums);
        console.log("asyncData::album", album);
        console.log('asyncData::params', params);
        return { params, album };
    }
};
</script>
<style lang="stylus" scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  left: 90%;
  height: fit-content;
}
h1 {
    text-align: center
}
.image {
    max-width: 100%
    height: auto
}
// 1 column on small
+xs() {
  .grid {
    display: grid;
    grid-template-columns: 1fr;
    width: 90%;
    margin: auto;
  }
}
+sm() {
  .grid {
    display: grid;
    grid-template-columns: 1fr;
    width: 90%;
    margin: auto;
  }
}
// 2 columns medium
+md() {
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 85%;
    margin: auto;
  }
}
// 3 columns on large
+lg() {
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 75%;
    margin: auto;
  }
}
+xl() {
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 75%;
    margin: auto;
  }
}
// 4 columns on extra large
+xxl() {
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    width: 75%;
    margin: auto;
  }
}
</style>
