import { computed, defineComponent, onMounted, PropType, ref, Slot } from "vue";
import { BlockResizer } from "./components/block-resizer";
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
    slots: {
      type: Object as PropType<Record<string, Slot | undefined>>,
      required: true,
    },
    customProps: { type: Object as PropType<Record<string, any>> },
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
      const formData = props.formData as Record<string, any>;
      let render: any;

      if (props.block?.slotName && props.slots[props.block.slotName]) {
        render = props.slots[props.block.slotName]!();
      } else {
        render = component?.render({
          size: props.block?.hasResize
            ? {
                width: props.block.width,
                height: props.block.height,
              }
            : {},
          props: props.block?.props || {},
          /**@ts-ignore */
          model: Object.keys(component.model || {}).reduce((prev, propName) => {
            const modelName = !props.block?.model
              ? null
              : props.block?.model[propName];
            prev[propName] = {
              [propName === "default" ? "modelValue" : propName]: props
                .formData[modelName],
              [modelName === "default" ? "onUpdate:modelValue" : "onChange"]: (
                val: any
              ) => modelName && (formData[modelName] = val),
            };
            return prev;
          }, {} as Record<string, any>),
          custom:
            !props.block?.slotName || !props.customProps
              ? {}
              : props.customProps[props.block?.slotName],
        });
      }

      const { width, height } = component?.resize || {};
      return (
        <div class={classes.value} style={styles.value} ref={el}>
          {render}
          {props.block?.focus && (width || height) && (
            <BlockResizer
              block={props.block!}
              component={component!}
            ></BlockResizer>
          )}
        </div>
      );
    };
  },
});
