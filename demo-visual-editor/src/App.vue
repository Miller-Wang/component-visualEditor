<template>
  <div class="app">
    <h1>这是页面内容</h1>
    <visual-editor v-if="false" />
    {{ val }}
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { VisualEditor } from "../src/packages/visual-editor";
// import { TestUseModel } from "../src/packages/utils/useModel";

export default defineComponent({
  name: "App",
  components: { VisualEditor },
  data() {
    return {
      val: "",
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
