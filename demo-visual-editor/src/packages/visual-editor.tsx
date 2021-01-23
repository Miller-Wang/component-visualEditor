import { computed, defineComponent, PropType, ref } from "vue";
import { useModel } from "./utils/useModel";
import { VisualEditorBlock } from "./visual-editor-block";
import "./visual-editor.scss";
import {
  VisualEditorComponent,
  VisualEditorConfig,
  VisualEditorModelValue,
} from "./visual-editor.utils";

export const VisualEditor = defineComponent({
  props: {
    modelValue: {
      type: Object as PropType<VisualEditorModelValue>,
      require: true,
    },
    config: {
      type: Object as PropType<VisualEditorConfig>,
      require: true,
    },
  },
  emits: {
    "update:modelValue": (val?: VisualEditorModelValue) => true,
  },
  setup(props, ctx) {
    const dataModel = useModel(
      () => props.modelValue,
      (val) => ctx.emit("update:modelValue", val)
    );
    const containerStyles = computed(() => ({
      width: `${props.modelValue?.container.width}px`,
      height: `${props.modelValue?.container.height}px`,
    }));

    const containerRef = ref({} as HTMLElement);

    const menuDragger = {
      current: {
        component: null as null | VisualEditorComponent,
      },
      dragstart: (e: DragEvent, component: VisualEditorComponent) => {
        containerRef.value.addEventListener("dragenter", menuDragger.dragenter);
        containerRef.value.addEventListener("dragover", menuDragger.dragover);
        containerRef.value.addEventListener("dragleave", menuDragger.dragleave);
        containerRef.value.addEventListener("drop", menuDragger.drop);
        menuDragger.current.component = component;
      },
      dragenter: (e: DragEvent) => {
        e.dataTransfer!.dropEffect = "move";
      },
      dragover: (e: DragEvent) => {
        e.preventDefault();
      },
      dragleave: (e: DragEvent) => {
        e.dataTransfer!.dropEffect = "none";
      },
      dragend: (e: DragEvent) => {
        containerRef.value.removeEventListener(
          "dragenter",
          menuDragger.dragenter
        );
        containerRef.value.removeEventListener(
          "dragover",
          menuDragger.dragover
        );
        containerRef.value.removeEventListener(
          "dragleave",
          menuDragger.dragleave
        );
        containerRef.value.removeEventListener("drop", menuDragger.drop);
        menuDragger.current.component = null;
      },
      drop: (e: DragEvent) => {
        console.log("drop", menuDragger.current.component);
        const blocks = dataModel.value?.blocks || [];
        blocks.push({
          top: e.offsetY,
          left: e.offsetX,
        });
        console.log("x", e.offsetX);
        console.log("y", e.offsetY);
        dataModel.value = {
          ...dataModel.value,
          blocks,
        } as VisualEditorModelValue;
      },
    };

    return () => (
      <div class="visual-editor">
        <div class="menu">
          {props.config?.componentList.map((component) => (
            <div
              class="menu-item"
              draggable
              onDragend={menuDragger.dragend}
              onDragstart={(e) => menuDragger.dragstart(e, component)}
            >
              <span class="menu-item-label">{component.label}</span>
              {component.preview()}
            </div>
          ))}
        </div>
        <div class="head">head</div>
        <div class="operator">operator</div>
        <div class="body">
          <div class="content">
            <div
              class="container"
              ref={containerRef}
              style={containerStyles.value}
            >
              {(dataModel.value?.blocks || []).map((block, index: number) => (
                <VisualEditorBlock block={block} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  },
});
