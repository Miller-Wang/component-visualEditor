import { computed, defineComponent, PropType, ref } from "vue";
import { useModel } from "./utils/useModel";
import { VisualEditorBlock } from "./visual-editor-block";
import "./visual-editor.scss";
import {
  createNewBlock,
  VisualEditorBlockData,
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

    const methods = {
      clearFocus: (block?: VisualEditorBlockData) => {
        let blocks = dataModel.value?.blocks || [];
        if (blocks.length === 0) return;

        if (block) {
          blocks = blocks.filter((v) => v !== block);
        }
        blocks.forEach((block) => (block.focus = false));
      },
    };

    const menuDragger = (() => {
      let component = null as null | VisualEditorComponent;

      const containerHandler = {
        /**
         * 拖拽组件进入容器，设置鼠标可放置状态
         */
        dragenter: (e: DragEvent) => {
          e.dataTransfer!.dropEffect = "move";
        },
        dragover: (e: DragEvent) => {
          e.preventDefault();
        },
        /**
         * 拖拽组件离开容器，设置鼠标禁用状态
         */
        dragleave: (e: DragEvent) => {
          e.dataTransfer!.dropEffect = "none";
        },
        /**
         * 在容器中放置组件
         */
        drop: (e: DragEvent) => {
          console.log("drop", component);
          const blocks = dataModel.value?.blocks || [];
          blocks.push(
            createNewBlock({
              component: component!,
              top: e.offsetY,
              left: e.offsetX,
            })
          );
          console.log("x", e.offsetX);
          console.log("y", e.offsetY);
          dataModel.value = {
            ...dataModel.value,
            blocks,
          } as VisualEditorModelValue;
        },
      };

      const blockHandler = {
        dragstart: (e: DragEvent, current: VisualEditorComponent) => {
          containerRef.value.addEventListener(
            "dragenter",
            containerHandler.dragenter
          );
          containerRef.value.addEventListener(
            "dragover",
            containerHandler.dragover
          );
          containerRef.value.addEventListener(
            "dragleave",
            containerHandler.dragleave
          );
          containerRef.value.addEventListener("drop", containerHandler.drop);
          component = current;
        },
        dragend: (e: DragEvent) => {
          containerRef.value.removeEventListener(
            "dragenter",
            containerHandler.dragenter
          );
          containerRef.value.removeEventListener(
            "dragover",
            containerHandler.dragover
          );
          containerRef.value.removeEventListener(
            "dragleave",
            containerHandler.dragleave
          );
          containerRef.value.removeEventListener("drop", containerHandler.drop);
          component = null;
        },
      };

      return blockHandler;
    })();

    // const blockDragger = (() => {
    //   console.log("blockDragger");
    // })();

    const focusHandler = (() => {
      return {
        container: {
          onMousedown: (e: MouseEvent) => {
            e.stopPropagation();
            methods.clearFocus();
          },
        },
        block: {
          onMousedown: (e: MouseEvent, block: VisualEditorBlockData) => {
            e.stopPropagation();
            e.preventDefault();

            if (!e.shiftKey) {
              block.focus = !block.focus;
              methods.clearFocus(block);
              // dataModel.value?.blocks.forEach((block) => (block.focus = false));
            } else {
              block.focus = !block.focus;
            }
          },
        },
      };
    })();

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
              {...focusHandler.container}
            >
              {(dataModel.value?.blocks || []).map((block, index: number) => (
                <VisualEditorBlock
                  block={block}
                  key={index}
                  config={props.config}
                  {...{
                    onMousedown: (e: MouseEvent) =>
                      focusHandler.block.onMousedown(e, block),
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  },
});
