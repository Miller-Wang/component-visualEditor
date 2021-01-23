import { computed, defineComponent, PropType } from "vue";
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
  },
  setup(props) {
    const styles = computed(() => ({
      top: `${props.block?.top}px`,
      left: `${props.block?.left}px`,
    }));

    return () => {
      const component = props.config?.componentMap[props.block!.componentKey];
      const Render = component?.render();
      return (
        <div class="visual-editor-block" style={styles.value}>
          {Render}
        </div>
      );
    };
  },
});
