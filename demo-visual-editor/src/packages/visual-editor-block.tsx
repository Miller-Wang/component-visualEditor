import { computed, defineComponent, onMounted, PropType, ref } from "vue";
import {
  VisualEditorBlockData,
  VisualEditorConfig,
} from "./visual-editor.utils";

export const VisualEditorBlock = defineComponent({
  props: {
    block: {
      type: Object as PropType<VisualEditorBlockData>,
    },
    config: {
      type: Object as PropType<VisualEditorConfig>,
    },
    formData: { type: Object as PropType<Record<string, any>>, required: true },
  },
  setup(props) {
    const el = ref({} as HTMLDivElement);
    const styles = computed(() => ({
      top: `${props.block?.top}px`,
      left: `${props.block?.left}px`,
      zIndex: props.block?.zIndex,
    }));

    const classes = computed(() => [
      "visual-editor-block",
      {
        "visual-editor-block-focus": props.block?.focus,
      },
    ]);

    onMounted(() => {
      // 放置block时，让组件居中，对准鼠标点
      const block = props.block;
      if (block?.adjustPosition) {
        const { offsetWidth, offsetHeight } = el.value;
        block.left -= offsetWidth / 2;
        block.top -= offsetHeight / 2;
        block.height = offsetHeight;
        block.width = offsetWidth;
        block.adjustPosition = false;
      }
    });

    return () => {
      const component = props.config?.componentMap[props.block!.componentKey];
      // const formData = props.formData as Record<string, any>;
      const Render = component?.render({
        props: props.block?.props || {},
        model: props.block?.model || {},
        /**@ts-ignore */
        // model: Object.entries(props.block?.model || {}).reduce(
        //   (prev, [propName, modelName]) => {
        //     prev[propName] = {
        //       [propName === "default" ? "modelValue" : propName]: props
        //         .formData[modelName],
        //       [modelName === "default" ? "onUpdate:modelValue" : "onChange"]: (
        //         val: any
        //       ) => (props.formData[modelName] = val),
        //     };
        //     return prev;
        //   },
        //   {} as Record<string, any>
        // ),
      });
      return (
        <div class={classes.value} style={styles.value} ref={el}>
          {Render}
        </div>
      );
    };
  },
});
