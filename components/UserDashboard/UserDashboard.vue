<template>
  <div>
    <div class="welcome">
      <h2>
        Welcome {{ UserInfo.first_name }}!
      </h2>
    </div>
    <div class="grid-layout">
      <AlbumCard
        v-for="(album, index) in Albums"
        :id="album.id"
        :key="index"
        :thumb="album.cover_photo"
        :count="album.count"
        :name="album.name"
        :photos="album.photos.map(pic => pic.source)"
        class="album-card"
      />
      <GramCard
        :cover="Grams[1].images.low_resolution.url"
        :count="Grams.length"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AlbumCard from "@/components/AlbumCard";
import GramCard from "@/components/GramCard";
export default {
  components: {
    AlbumCard,
    GramCard
  },
  computed: {
    ...mapGetters("facebook", ["UserInfo", "Albums", "Grams"])
  },
  async beforeMount() {
    await this.$store.dispatch("facebook/getAlbums");
    await this.$store.dispatch("facebook/getGrams");
  }
};
</script>
<style lang="stylus" scoped>
.welcome {
  text-align: center;
}
h3 {
  text-align: center;
}
// 1 column on small and below
+sm() {
  .grid-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 90%;
    margin: auto;
  }
  .album-card {
    align-self: center;
  }
}
// 2 columns on medium
+md() {
  .grid-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 90%;
    margin: auto;
  }
  .album-card {
    align-self: center;
  }
}
// 3 columns on large
+lg() {
  .grid-layout {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 75%;
    margin: auto;
  }
  .album-card {
    align-self: auto
  }
}
+xl() {
  .grid-layout {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 75%;
    margin: auto;
  }
  .album-card {
    align-self: auto
  }
}
// 4 columns on very large
+xxl() {
  .grid-layout {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    width: 75%;
    margin: auto;
  }
  .album-card {
    align-self: auto
  }
}
</style>
