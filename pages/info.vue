<template>
  <div>
    <div class="welcome">
      <h2>
        Welcome {{ UserInfo.first_name }}!
      </h2>
      <div class="cover_photos">
        <img :src="UserInfo.picture.data.url">
      </div>
    </div>
    <div>
      <h3>
        Photo Albums
      </h3>
    </div>
    <div class="grid-layout">
      <AlbumCard
        v-for="(album, index) in Albums"
        :id="album.id"
        :key="index"
        :thumb="album.cover_photo"
        :count="album.count"
        :name="album.name"
        class="album-card"
      />
    </div>
    <GramCard
      :video="Grams[0].videos.standard_resolution.url"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AlbumCard from "@/components/AlbumCard/AlbumCard";
import GramCard from "@/components/GramCard";
export default {
  components: {
    AlbumCard,
    GramCard
  },
  async fetch({ store }) {
    await store.dispatch("facebook/getEvents");
    await store.dispatch("facebook/getAlbums");
    await store.dispatch("facebook/getGrams");
  },
  computed: {
    ...mapGetters("facebook", ["UserInfo", "UserEvents", "UserPhotos", "Albums", "Grams"])
  }
};
</script>
<style lang="stylus" scoped>
+lg() {
  .welcome {
    text-align: center;
  }
  h3 {
    margin-left: auto;
    margin-right: auto;
    width: 12rem;
  }
  .grid-layout {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    left: 90%;
  }
}
+md() {
    .welcome {
    text-align: center;
  }
  h3 {
    text-align: center;
  }
  .grid-layout {
    left: 90%;
  }
}
+sm() {
  .welcome {
    text-align: center;
  }
  h3 {
    text-align: center;
  }
  .grid-layout {
    left: 90%;
  }
}
</style>
