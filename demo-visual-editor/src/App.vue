<template>
  <div class="app">
    <visual-editor
      v-model="jsonData"
      :config="visualConfig"
      :formData="formData"
    />
    <div style="text-align: center">
      <!-- {{ JSON.stringify(formData) }} -->
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { VisualEditor } from "../src/packages/visual-editor";
// import { TestUseModel } from "../src/packages/utils/useModel";
import visualConfig from "./packages/visual.config";
import jsonData from "./jsonData.json";

export default defineComponent({
  name: "App",
  components: { VisualEditor },
  data() {
    return {
      visualConfig,
      jsonData: jsonData,
      formData: {
        username: "admin",
      },
    };
  },
});
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
}
</style>
