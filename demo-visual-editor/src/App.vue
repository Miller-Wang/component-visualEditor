<template>
  <div class="app">
    <visual-editor
      v-model="jsonData"
      :config="visualConfig"
      :formData="formData"
      :customProps="customProps"
    >
      <template #subBtn>
        <el-button type="">自定义按钮</el-button>
        <el-tag type="">自定义标签</el-tag>
      </template>
    </visual-editor>
    <div class="show-text">
      {{ JSON.stringify(formData) }}
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
      customProps: {
        subBtn: {
          onClick: () => {
            this.$notify({ message: "执行表单数据校验及提交服务器的动作" });
          },
        },
        mySelect: {
          onChange: (val: string) => {
            this.$notify({ message: `食物发生变化: ${val}` });
          },
        },
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
.show-text {
  position: absolute;
  text-align: center;
  width: 100%;
  bottom: 200px;
}
</style>
