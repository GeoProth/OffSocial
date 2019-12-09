import Vue from "vue";
import Icon from "vue-awesome/components/Icon";
import "vue-awesome/icons";
import Popover from "vue-js-popover";
const components = {};

const requireComponent = require.context(
  "../components/ui", // Path to the UI components folder
  true, // Whether or not to look in subfolders
  /[A-Z]\w+\.(vue|js)$/ // RegExp for UI components
);

requireComponent.keys().forEach((fileName) => {
  // Get component config
  const componentConfig = requireComponent(fileName);

  // Get component name
  // Strip the leading path and extension from the filename
  const componentName = fileName.replace(/(.*)\/(.*)\.\w+$/, "$2");

  // Register component globally
  components[componentName] = Vue.component(
    componentName,
    // Look for the component options on `.default`, which will
    // exist if the component was exported with `export default`,
    // otherwise fall back to module's root.
    componentConfig.default || componentConfig
  );
});

components.Icon = Vue.component("Icon", Icon);
Vue.use(Popover);
export default components;
