import Vue from "vue";
export default function Env(context, inject) {
  inject("env", {
    name: "",
    api: "",
    app_id: "",
    getEnv() {
      if (this.name && this.api) return;
      if (
        window.location.href.includes("localhost") ||
        window.location.href.includes("amazonaws.com")
      ) {
        this.api = "https://dev.api.jrasm.us";
        this.app_id = "311261622908724";
        this.name = "dev";
        return;
      }
      this.api = "https://api.jrasm.us";
      this.app_id = "386318422146303";
      this.name = "prod";
    }
  });
  Vue.mixin({
    beforeMount() {
      if (!this.$env.name) this.$env.getEnv();
    }
  });
}
