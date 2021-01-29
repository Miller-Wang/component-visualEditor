<template>
    <div class="app">
        <h1>这个是页面内容</h1>
        <visual-editor v-model="jsonData" :config="visualConfig"/>
    </div>
</template>

<script lang="ts">
    import {defineComponent} from 'vue';
    import {VisualEditor} from "@/packages/visual-editor";
    import {visualConfig} from "@/visual.config";
    import jsonData from './data.json'

    export default defineComponent({
        name: 'App',
        components: {
            VisualEditor,
        },
        data() {
            return {
                visualConfig,
                jsonData,
            }
        },
    });
</script>

<style lang="scss">
    html, body {
        margin: 0;
        padding: 0;
    }
</style>
