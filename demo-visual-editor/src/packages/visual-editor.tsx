import { computed, defineComponent, PropType, reactive, ref } from "vue";
import { createEvent } from "./plugins/event";
import { $$dialog } from "./utils/dialog-service";
import { useModel } from "./utils/useModel";
import { useVisualCommand } from "./utils/visual.command";
import { VisualEditorBlock } from "./visual-editor-block";
import { ElMessageBox } from "element-plus";
import "./visual-editor.scss";
import {
  createNewBlock,
  VisualEditorBlockData,
  VisualEditorComponent,
  VisualEditorConfig,
  VisualEditorModelValue,
  VisualEditorMarkLine,
} from "./visual-editor.utils";
import { $$dropdown, DropdownOption } from "./utils/dropdown-service";
import { VisualOperatorEditor } from "./visual-editor-operator";

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
    // 双向数据绑定
    const dataModel = useModel(
      () => props.modelValue,
      (val) => ctx.emit("update:modelValue", val)
    );
    // container样式
    const containerStyles = computed(() => ({
      width: `${props.modelValue?.container.width}px`,
      height: `${props.modelValue?.container.height}px`,
    }));
    // container dom引用
    const containerRef = ref({} as HTMLElement);

    // 计算选中与未选中的block数据
    const focusData = computed(() => {
      const focus: VisualEditorBlockData[] =
        dataModel.value?.blocks.filter((v) => v.focus) || [];
      const unfocus: VisualEditorBlockData[] =
        dataModel.value?.blocks.filter((v) => !v.focus) || [];
      return {
        focus, // 此时选中的数据
        unfocus, // 此时未选中的数据
      };
    });

    const selectIndex = ref(-1);
    const state = reactive({
      // selectBlock: undefined as undefined | VisualEditorBlockData, // 当前选中的block
      selectBlock: computed(
        () => (dataModel.value?.blocks || [])[selectIndex.value]
      ),
      editing: false,
    });

    const classes = computed(() => [
      "visual-editor",
      {
        editing: state.editing,
      },
    ]);

    const dragstart = createEvent();
    const dragend = createEvent();

    // 对外暴露的一些方法
    const methods = {
      clearFocus: (block?: VisualEditorBlockData) => {
        let blocks = dataModel.value?.blocks || [];
        if (blocks.length === 0) return;

        if (block) {
          blocks = blocks.filter((v) => v !== block);
        }
        blocks.forEach((block) => (block.focus = false));
      },
      updateBlocks: (blocks: VisualEditorBlockData[]) => {
        dataModel.value!.blocks = blocks;
      },

      importBlockData: async (block: VisualEditorBlockData) => {
        const text = await $$dialog.textarea("", {
          title: "请输入节点Json字符串",
        });
        try {
          const data = JSON.parse(text || "");
          if (typeof data !== "object") {
            throw new Error();
          }
          commander.updateBlock(data, block);
        } catch (error) {
          ElMessageBox.alert("解析json字符串出错");
        }
      },
      showBlockData: (block: VisualEditorBlockData) => {
        $$dialog.textarea(JSON.stringify(block), { title: "节点数据" });
      },
    };

    // 处理菜单拖拽进容器
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
          dragend.emit();
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
          dragstart.emit();
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

    // 处理组件在画布上他拖拽
    const blockDragger = (() => {
      const mark = reactive({
        x: null as null | number,
        y: null as null | number,
      });
      let dragState = {
        startX: 0,
        startY: 0,
        startLeft: 0,
        startTop: 0,
        startPos: [] as { left: number; top: number }[],
        dragging: false,
        markLines: {} as VisualEditorMarkLine,
      };

      const mousemove = (e: MouseEvent) => {
        if (!dragState.dragging) {
          dragState.dragging = true;
          dragstart.emit();
        }

        let { clientX: moveX, clientY: moveY } = e;

        const { startX, startY } = dragState;

        // 水平、垂直移动
        if (e.shiftKey) {
          if (Math.abs(e.clientX - startX) > Math.abs(e.clientY - startY)) {
            moveY = startY;
          } else {
            moveX = startX;
          }
        }

        const currentLeft = dragState.startLeft + moveX - startX;
        const currentTop = dragState.startTop + moveY - startY;
        const currentMark = {
          x: null as null | number,
          y: null as null | number,
        };

        for (let i = 0; i < dragState.markLines.y.length; i++) {
          const { top, showTop } = dragState.markLines.y[i];
          if (Math.abs(top - currentTop) < 5) {
            moveY = top + startY - dragState.startTop;
            currentMark.y = showTop;
            break;
          }
        }

        for (let i = 0; i < dragState.markLines.x.length; i++) {
          const { left, showLeft } = dragState.markLines.x[i];
          if (Math.abs(left - currentLeft) < 5) {
            moveX = left + startX - dragState.startLeft;
            currentMark.x = showLeft;
            break;
          }
        }

        const durY = moveY - startY;
        const durX = moveX - startX;
        focusData.value.focus.forEach((block, i) => {
          block.top = dragState.startPos[i].top + durY;
          block.left = dragState.startPos[i].left + durX;
        });

        mark.x = currentMark.x;
        mark.y = currentMark.y;
      };
      const mouseup = (e: MouseEvent) => {
        document.removeEventListener("mousemove", mousemove);
        document.removeEventListener("mouseup", mouseup);
        mark.x = null;
        mark.y = null;
        if (dragState.dragging) {
          dragend.emit();
        }
      };

      const mousedown = (e: MouseEvent) => {
        dragState = {
          startX: e.clientX,
          startY: e.clientY,
          startTop: state.selectBlock!.top,
          startLeft: state.selectBlock!.left,
          startPos: focusData.value.focus.map(({ top, left }) => ({
            top,
            left,
          })),
          dragging: false,
          markLines: (() => {
            const { focus, unfocus } = focusData.value;
            // 当前选中的block
            const { top, left, width, height } = state.selectBlock!;
            let lines = { x: [], y: [] } as VisualEditorMarkLine;
            [
              ...unfocus,
              {
                top: 0,
                left: 0,
                width: dataModel.value!.container.width,
                height: dataModel.value!.container.height,
              },
            ].forEach((block) => {
              const { top: t, left: l, width: w, height: h } = block;
              // y轴对齐方式
              lines.y.push({ top: t, showTop: t }); // 顶对顶
              lines.y.push({ top: t + h, showTop: t + h }); // 底对底
              lines.y.push({ top: t + h / 2 - height / 2, showTop: t + h / 2 }); // 中对中
              lines.y.push({ top: t - height, showTop: t }); // 顶对底
              lines.y.push({ top: t + h - height, showTop: t + h }); //

              // x轴对齐方式

              lines.x.push({ left: l, showLeft: l }); // 顶对顶
              lines.x.push({ left: l + w, showLeft: l + w }); // 底对底
              lines.x.push({
                left: l + w / 2 - width / 2,
                showLeft: l + w / 2,
              }); // 中对中
              lines.x.push({ left: l - width, showLeft: l }); // 顶对底
              lines.x.push({ left: l + w - width, showLeft: l + w }); // 中对中
            });

            return lines;
          })(),
        };
        document.addEventListener("mousemove", mousemove);
        document.addEventListener("mouseup", mouseup);
      };

      return { mousedown, mark };
    })();

    // 其他事件
    const handler = {
      onContextmenuBlock: (e: MouseEvent, block: VisualEditorBlockData) => {
        if (!state.editing) return;
        e.preventDefault();
        e.stopPropagation();

        $$dropdown({
          reference: e,
          content: () => (
            <>
              <DropdownOption
                label="置顶节点"
                icon="icon-place-top"
                {...{ onClick: commander.placeTop }}
              />
              <DropdownOption
                label="置底节点"
                icon="icon-place-bottom"
                {...{ onClick: commander.placeBottom }}
              />
              <DropdownOption
                label="删除节点"
                icon="icon-delete"
                {...{ onClick: commander.delete }}
              />
              <DropdownOption
                label="查看数据"
                icon="icon-browse"
                {...{ onClick: () => methods.showBlockData(block) }}
              />
              <DropdownOption
                label="导入节点"
                icon="icon-import"
                {...{ onClick: () => methods.importBlockData(block) }}
              />
            </>
          ),
        });
      },
    };

    // 处理组件的选中状态
    const focusHandler = (() => {
      return {
        container: {
          onMousedown: (e: MouseEvent) => {
            e.preventDefault();
            if (e.currentTarget !== e.target) {
              return;
            }

            methods.clearFocus();
            // state.selectBlock = undefined;
            selectIndex.value = -1;
          },
        },
        block: {
          onMousedown: (
            e: MouseEvent,
            block: VisualEditorBlockData,
            index: number
          ) => {
            if (!state.editing) return;

            e && e.preventDefault();
            // 只有元素未选中状态下， 才去处理
            if (!block.focus) {
              if (!e.shiftKey) {
                block.focus = !block.focus;
                methods.clearFocus(block);
              } else {
                block.focus = true;
              }
            }
            // state.selectBlock = block;
            selectIndex.value = index;
            // 处理组件的选中移动
            blockDragger.mousedown(e);
          },
        },
      };
    })();
    const commander = useVisualCommand({
      focusData: focusData,
      updateBlocks: methods.updateBlocks,
      dataModel,
      dragstart,
      dragend,
    });

    const handleImport = async () => {
      console.log("handleImport");
      const text = await $$dialog.textarea("", {
        title: "请输入要导入的Json字符串",
      });
      console.log("text", text);
      try {
        const data = JSON.parse(text || "");
        if (typeof data !== "object") {
          throw new Error();
        }
        dataModel.value = data;
      } catch (error) {
        ElMessageBox.alert("解析json字符串出错");
      }
    };

    const handleExport = async () => {
      console.log("handleImport");
      const text = await $$dialog.textarea(JSON.stringify(dataModel.value), {
        title: "导出内容",
      });
      console.log("text", text);
    };

    const buttons = [
      {
        label: "撤销",
        icon: "icon-back",
        handler: commander.undo,
        tip: "ctrl+z",
      },
      {
        label: "重做",
        icon: "icon-forward",
        handler: commander.redo,
        tip: "ctrl+y, ctrl+shift+z",
      },
      {
        label: () => (state.editing ? "编辑" : "预览"),
        icon: () => (state.editing ? "icon-edit" : "icon-browse"),
        handler: () => {
          if (!state.editing) {
            methods.clearFocus();
          }
          state.editing = !state.editing;
        },
      },
      {
        label: "导入",
        icon: "icon-import",
        handler: handleImport,
      },

      {
        label: "导出",
        icon: "icon-export",
        handler: handleExport,
      },
      {
        label: "置顶",
        icon: "icon-place-top",
        handler: () => commander.placeTop(),
      },
      {
        label: "置低",
        icon: "icon-place-bottom",
        handler: () => commander.placeBottom(),
      },

      {
        label: "删除",
        icon: "icon-delete",
        handler: () => commander.delete(),
        tip: "ctrl+d, backspance, delete,",
      },
      {
        label: "清空",
        icon: "icon-reset",
        handler: () => commander.clear(),
      },
    ];

    const excuteFun = (fn: any) => {
      return typeof fn === "function" ? fn() : fn;
    };

    return () => {
      console.log("selectBlock", state.selectBlock);
      return (
        <div class={classes.value}>
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
          <div class="head">
            {buttons.map((btn, index) => {
              const content = (
                <div key={index} class="head-btn" onClick={btn.handler}>
                  <i class={`iconfont ${excuteFun(btn.icon)}`}></i>
                  <span>{excuteFun(btn.label)}</span>
                </div>
              );
              if (!btn.tip) return content;
              return (
                <el-tooltip effect="dark" content={btn.tip} placement="bottom">
                  {content}
                </el-tooltip>
              );
            })}
          </div>

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
                        focusHandler.block.onMousedown(e, block, index),
                      onContextmenu: (e: MouseEvent) =>
                        handler.onContextmenuBlock(e, block),
                    }}
                  />
                ))}
                {blockDragger.mark.x && (
                  <div
                    class="mark-line-x"
                    style={{ left: `${blockDragger.mark.x}px` }}
                  ></div>
                )}
                {blockDragger.mark.y && (
                  <div
                    class="mark-line-y"
                    style={{ top: `${blockDragger.mark.y}px` }}
                  ></div>
                )}
              </div>
            </div>
          </div>

          <VisualOperatorEditor
            block={state.selectBlock!}
            config={props.config}
            dataModel={dataModel as any}
            updateBlock={commander.updateBlock}
            updateModelValue={commander.updateModelValue}
          />
        </div>
      );
    };
  },
});
