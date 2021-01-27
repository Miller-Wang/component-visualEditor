import { reactive } from "vue";
export interface CommondExecute {
  undo: () => void;
  redo: () => void;
}

export interface Command {
  name: string; // 命令唯一标识
  keyboard?: string | string[]; // 命令监听的快捷键
  execute: (...args: any[]) => CommondExecute; // 命令被执行的时候，做的内容
  followQueue?: boolean; // 命令执行完之后，是否将命令执行得到的undo, redo存入命令队列
  init?: () => () => void | undefined;
  data?: any;
}

export interface CommandManager {
  queue: CommondExecute[];
  current: number;
}

export function useCommander() {
  const state = reactive({
    current: -1,
    queue: [] as CommondExecute[],
    commands: {} as Record<string, (...args: any[]) => void>,
    destroyList: [] as (() => void | undefined)[],
    commandArray: [] as Command[],
  });
  const registry = (command: Command) => {
    // state.commandArray.push(command);
    // state.commands[command.name] = (...args) => {
    //   const { undo, redo } = command.execute(...args);
    //   if (command.followQueue !== false) {
    //     state.queue.push({ undo, redo });
    //     state.current += 1;
    //   }
    //   redo();
    // };

    state.commandArray.push(command);
    state.commands[command.name] = (...args) => {
      const { undo, redo } = command.execute(...args);
      redo();
      /*如果命令执行之后，不需要进入命令队列，则直接结束*/
      if (command.followQueue === false) {
        return;
      }
      /*否则，将命令队列中剩余的命令去除，保留current及其之前的命令*/
      let { queue } = state;
      const { current } = state;
      if (queue.length > 0) {
        queue = queue.slice(0, current + 1);
        state.queue = queue;
      }
      /*设置命令队列中最后一个命令为当前执行的命令*/
      queue.push({ undo, redo });
      /*索引+1，指向队列中的最后一个命令*/
      state.current = current + 1;
    };
  };

  const init = () => {
    const onKeydown = (e: KeyboardEvent) => {
      console.log("监听到键盘事件");
    };
    window.addEventListener("keydown", onKeydown);
    state.commandArray.forEach(
      (command) => !!command.init && state.destroyList.push(command.init())
    );
    state.destroyList.push(() =>
      window.removeEventListener("keydown", onKeydown)
    );
  };

  // const destory = () => {};

  registry({
    name: "undo",
    keyboard: "ctrl+z",
    followQueue: false,
    execute: () => {
      // 命令被执行的时候，要做的事情
      return {
        redo: () => {
          // 重新做一遍，要做的事情
          const { current } = state;
          if (current === -1) return;
          const queueItem = state.queue[current];
          if (queueItem) {
            queueItem.undo && queueItem.undo();
            state.current--;
          }
        },
        undo: () => {
          // 将做的事情还原
        },
      };
    },
  });

  registry({
    name: "redo",
    keyboard: ["ctrl+y", "ctrl+shift+z"],
    followQueue: false,
    execute: () => {
      return {
        redo: () => {
          const queueItem = state.queue[state.current + 1];
          if (queueItem) {
            queueItem.redo();
            state.current++;
          }
        },
        undo: () => {
          console.log("undo");
        },
      };
    },
  });

  return {
    state,
    registry,
    init,
  };
}
