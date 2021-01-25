import { useCommander } from "../plugins/command.plugin";

export function useVisualCommand() {
  const commander = useCommander();

  commander.registry({
    name: "delete",
    keyboard: ["backspace", "delete", "ctrl+d"],
    followQueue: false,
    execute: () => {
      console.log("执行删除命令");
      return {
        redo: () => {
          console.log("重做删除命令");
        },
        undo: () => {
          console.log("撤回删除命令");
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
