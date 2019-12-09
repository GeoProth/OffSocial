<template>
  <div class="grid">
    <InstaPhotoCard
      v-for="(image, index) in Grams.filter(
        img => img.type === 'image' || img.type === 'video'
      )"
      :key="index"
      :image="image"
    />
  </div>
</template>
<script>
/* eslint-disable */
import { mapGetters } from "vuex";
import InstaPhotoCard from "@/components/InstaPhotoCard";
export default {
  components: {
    InstaPhotoCard
  },
  beforeMount() {
    console.log("beforeMount::Grams", this.Grams);
  },
  computed: {
    ...mapGetters("facebook", ["Grams"]),
    videos() {
      return this.Grams.filter(img => img.type === "video");
    },
    images() {
      return this.Grams.filter(img => img.type === "image");
    }
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
