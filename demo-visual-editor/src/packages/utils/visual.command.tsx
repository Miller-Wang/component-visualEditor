import { useCommander } from "../plugins/command.plugin";
import { VisualEditorBlockData } from "../visual-editor.utils";

export function useVisualCommand({
  focusData,
  updateBlocks,
  dataModel,
}: {
  focusData: {
    value: { focus: VisualEditorBlockData[]; unfocus: VisualEditorBlockData[] };
  };
  updateBlocks: any;
  dataModel: any;
}) {
  const commander = useCommander();

  commander.registry({
    name: "delete",
    keyboard: ["backspace", "delete", "ctrl+d"],
    execute: () => {
      console.log("执行删除命令");
      const data = {
        before: dataModel.value.blocks || [],
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
  return {
    undo: () => commander.state.commands.undo(),
    redo: () => commander.state.commands.redo(),
    delete: () => commander.state.commands.delete(),
  };
}
