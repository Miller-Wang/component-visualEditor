import { useCommander } from "../plugins/command.plugin";
import {
  VisualEditorBlockData,
  VisualEditorModelValue,
} from "../visual-editor.utils";
import deepcopy from "deepcopy";

export function useVisualCommand({
  focusData,
  updateBlocks,
  dataModel,
  dragstart,
  dragend,
}: {
  focusData: {
    value: { focus: VisualEditorBlockData[]; unfocus: VisualEditorBlockData[] };
  };
  updateBlocks: (blocks: VisualEditorBlockData[]) => void;
  dataModel: { value: VisualEditorModelValue | undefined };
  dragstart: { on: (cb: () => void) => void; off: (cb: () => void) => void };
  dragend: { on: (cb: () => void) => void; off: (cb: () => void) => void };
}) {
  const commander = useCommander();

  // 删除命令
  commander.registry({
    name: "delete",
    keyboard: ["backspace", "delete", "ctrl+d"],
    execute: () => {
      console.log("执行删除命令");
      const data = {
        before: dataModel.value?.blocks || [],
        after: focusData.value.unfocus,
      };
      return {
        redo: () => {
          console.log("重做删除命令");
          updateBlocks(data.after);
        },
        undo: () => {
          console.log("撤回删除命令");
          updateBlocks(data.before);
        },
      };
    },
  });

  commander.registry({
    name: "updateBlocks",
    execute: (blocks: VisualEditorBlockData[]) => {
      console.log("执行删除命令");
      const data = {
        before: dataModel.value?.blocks || [],
        after: focusData.value.unfocus,
      };
      return {
        redo: () => {
          console.log("重做删除命令");
          updateBlocks(data.after);
        },
        undo: () => {
          console.log("撤回删除命令");
          updateBlocks(data.before);
        },
      };
    },
  });

  /**
   * 拖拽命令
   * - 从菜单拖拽组件到容器画布；
   * - 在容器中拖拽组件调整位置
   * - 拖拽调整组件的宽度和高度；
   */
  commander.registry({
    name: "drag",
    init() {
      this.data = {
        before: null as null | VisualEditorBlockData[],
      };
      const handler = {
        dragstart: () => {
          this.data.before = deepcopy(dataModel.value?.blocks || []);
        },
        dragend: () => {
          commander.state.commands.drag();
        },
      };
      dragstart.on(handler.dragstart);
      dragend.on(handler.dragend);

      return () => {
        dragstart.off(handler.dragstart);
        dragend.off(handler.dragend);
      };
    },
    execute() {
      const before = deepcopy(this.data.before);
      const after = deepcopy(dataModel.value?.blocks || []);
      return {
        redo: () => {
          updateBlocks(deepcopy(after));
        },
        undo: () => {
          updateBlocks(deepcopy(before));
        },
      };
    },
  });

  commander.registry({
    name: "clear",
    execute: () => {
      const data = {
        before: deepcopy(dataModel.value?.blocks),
        after: deepcopy([]),
      };
      return {
        redo: () => {
          updateBlocks(deepcopy(data.after));
        },
        undo: () => {
          updateBlocks(deepcopy(data.before || []));
        },
      };
    },
  });

  commander.registry({
    name: "placeTop",
    keyboard: "ctrl+up",
    execute: () => {
      const data = {
        before: deepcopy(dataModel.value?.blocks),
        after: deepcopy(
          (() => {
            const { focus, unfocus } = focusData.value;
            const maxZIndex = unfocus.reduce((prev, block) => {
              return Math.max(prev, block.zIndex);
            }, -Infinity);
            focus.forEach((block) => (block.zIndex = maxZIndex + 1));
            return deepcopy(dataModel.value?.blocks);
          })()
        ),
      };
      return {
        redo: () => {
          updateBlocks(deepcopy(data.after || []));
        },
        undo: () => {
          updateBlocks(deepcopy(data.before || []));
        },
      };
    },
  });

  commander.registry({
    name: "placeBottom",
    keyboard: "ctrl+down",
    execute: () => {
      const data = {
        before: deepcopy(dataModel.value?.blocks),
        after: deepcopy(
          (() => {
            const { focus, unfocus } = focusData.value;
            let minZIndex = unfocus.reduce((prev, block) => {
              return Math.min(prev, block.zIndex);
            }, Infinity);

            if (minZIndex <= 0) {
              unfocus.forEach(
                (block) =>
                  (block.zIndex = 1 + block.zIndex + Math.abs(minZIndex))
              );
              minZIndex = 1;
            }
            focus.forEach((block) => (block.zIndex = minZIndex - 1));
            return deepcopy(dataModel.value?.blocks);
          })()
        ),
      };
      return {
        redo: () => {
          updateBlocks(deepcopy(data.after || []));
        },
        undo: () => {
          updateBlocks(deepcopy(data.before || []));
        },
      };
    },
  });

  commander.registry({
    name: "updateBlock",
    execute: (newVal: VisualEditorBlockData, oldVal: VisualEditorBlockData) => {
      let blocks = deepcopy(dataModel.value?.blocks || []);
      let data = {
        before: deepcopy(dataModel.value?.blocks),
        after: (() => {
          blocks = [...blocks];
          const index = dataModel.value!.blocks.indexOf(oldVal);
          if (index > -1) {
            blocks.splice(index, 1, newVal);
          }
          return deepcopy(blocks);
        })(),
      };
      return {
        redo: () => {
          updateBlocks(deepcopy(data.after || []));
        },
        undo: () => {
          updateBlocks(deepcopy(data.before || []));
        },
      };
    },
  });

  commander.registry({
    name: "updateModelValue",
    execute: (val: VisualEditorModelValue) => {
      const data = {
        before: deepcopy(dataModel.value),
        after: deepcopy(val),
      };
      return {
        redo: () => {
          dataModel.value = data.after;
        },
        undo: () => {
          dataModel.value = data.before;
        },
      };
    },
  });

  commander.registry({
    name: "selectAll",
    followQueue: false,
    keyboard: "ctrl+a",
    execute: () => {
      return {
        redo: () => {
          (dataModel.value?.blocks || []).forEach(
            (block) => (block.focus = true)
          );
        },
        undo: () => {
          console.log("");
        },
      };
    },
  });

  commander.init();

  return {
    undo: () => commander.state.commands.undo(),
    redo: () => commander.state.commands.redo(),
    delete: () => commander.state.commands.delete(),
    clear: () => commander.state.commands.clear(),
    placeTop: () => commander.state.commands.placeTop(),
    placeBottom: () => commander.state.commands.placeBottom(),
    updateBlock: (
      newVal: VisualEditorBlockData,
      oldVal: VisualEditorBlockData
    ) => commander.state.commands.updateBlock(newVal, oldVal),
    updateModelValue: (val: VisualEditorModelValue) =>
      commander.state.commands.updateModelValue(val),
  };
}
