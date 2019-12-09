git <template>
  <div class="root-container">
    <Card class="front-page-card">
      <Login />
    </Card>
  </div>
</template>

<script>
import Login from "@/components/Login";
export default {
  components: { Login }
};
</script>
<style lang="stylus" scoped>
.root-container {
  margin: 0rem 0rem 0rem 0rem
  height: 100%
  color: white
  text-align: center
}
.icon-container {
  height: 15rem
}
.project-icon {
  height: 100%
  width: 100%
  max-width: 100%
  max-height: 100%
}
.front-page-card {
  height: calc(75vh - 2rem)
  margin-left: auto
  margin-right: auto
  margin-top: 2.5rem
  .blue {
    background-color: #1976d2
  }
  button {
    margin-top: 2rem
    background-color: #388e3c
    color: ui_gray
    height: 3.5rem
    width: 7.5rem
  }
}
+xs() {
  .front-page-card {
    width: 90%;
    height: 25rem;
    box-shadow: -3px 3px 10px -7.5px;
  }
}
+sm() {
  .front-page-card {
    width: 75%
    height: 25rem;
    box-shadow: -3px 3px 10px -7.5px;
  }
}
+md() {
  .front-page-card {
    width: 25%;
    height: 25rem;
    box-shadow: -3px 3px 10px -7.5px;
  }
}
+lg() {
  .front-page-card {
    width: 25%;
    height: 25rem;
    box-shadow: -3px 3px 10px -7.5px;
  }
}
+xl() {
  .front-page-card {
    width: 25%;
    height: 25rem;
    box-shadow: -3px 3px 10px -7.5px;
  }
}
+xxl() {
  .front-page-card {
    width: 25%;
    height: 25rem;
    box-shadow: -3px 3px 10px -7.5px;
  }
}
</style>
