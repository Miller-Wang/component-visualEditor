import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {KeyboardCode} from "./keyboard-code";
import {useUpdate} from "../utils/useUpdate";

interface CommandQueueItem {
    undo?: () => void,
    redo: () => void,
}

export class Command {
    name: string                                                        // 命令名称
    execute: (...args: any[]) => CommandQueueItem                       // 命令执行的逻辑
    keyboard?: string | string[]                                        // 监听的键盘事件：ctrl+shift+alt+a
    enable?: () => boolean                                              // 判断当前是否可用
    followQueue?: boolean                                               // 是否遵循命令队列
    doNothingWhenExecute?: boolean                                      // 在调用execute的时候是否什么也不做 (dragend 的时候，这个位置的更新已经由graph做好了，这时候execute不需要立即执行redu)
    data?: any                                                          // 命令缓存的数据
    init?: (() => void)                                                 // 命令初始化函数
    destroy?: (() => void)                                              // 命令初始化函数
    constructor(command: Command) {
        this.name = command.name
        this.execute = command.execute
        this.enable = command.enable
        this.followQueue = command.followQueue == null ? true : command.followQueue
        this.doNothingWhenExecute = command.doNothingWhenExecute == null ? false : command.doNothingWhenExecute
        this.data = {}
        Object.assign(this, command)
    }
}

export function useCommander() {

    const {forceUpdate} = useUpdate()

    const [state] = useState({
        queue: [] as CommandQueueItem[],                                    // 当前执行过的命令队列
        index: -1,                                                          // 当前命令在命令队列中的索引
        registerCommands: [] as Command[],                                  // 当前注册的命令
        commands: {} as { [key: string]: (...args: any[]) => void },        // 可以执行的命令对象
    })

    const enable = useCallback(() => {
        return state.registerCommands.reduce((ret, item) => {
            ret[item.name] = item.enable == null ? true : item.enable()
            return ret
        }, {} as { [k: string]: boolean })
    }, [])

    const registry = useCallback((command: Command) => {
        state.registerCommands.push(command)
        /* execute */
        state.commands[command.name] = (...args: any[]) => {
            if (!enable()[command.name]) {
                return
            }
            const {undo, redo} = command.execute(...args)
            if (!command.followQueue) {
                return (!command.doNothingWhenExecute && redo())
            }
            let {queue, index} = state
            if (queue.length > 0) {
                queue = queue.slice(0, index + 1)
                state.queue = queue
            }
            queue.push({undo, redo})
            state.index = index + 1;
            (!command.doNothingWhenExecute && redo());
        }
        forceUpdate()
    }, [])

    const [event] = useState(() => {
        const onKeydown = (e: KeyboardEvent) => {
            if (document.activeElement !== document.body) {
                return;
            }
            const names = [];
            (e.ctrlKey || e.metaKey) && names.push('ctrl')
            e.shiftKey && names.push('shift')
            e.altKey && names.push('alt')
            names.push(KeyboardCode[e.keyCode])
            const compositionKeyName = names.join('+')
            state.registerCommands.forEach((command: Command) => {
                if (!command.keyboard) return
                const keys = Array.isArray(command.keyboard) ? command.keyboard : [command.keyboard]
                if (keys.indexOf(compositionKeyName) > -1) {
                    e.stopPropagation()
                    e.preventDefault()
                    state.commands[command.name]()
                }
            })
        }
        return {
            init: () => {
                window.addEventListener('keydown', onKeydown)
            },
            destroy: () => {
                window.removeEventListener('keydown', onKeydown)
            },
        }
    })

    const init = useCallback(() => {
        event.init()
        state.registerCommands.forEach(command => {
            !!command.init && command.init()
        })
    }, [])

    const destroy = useCallback(() => {
        event.destroy()
        state.registerCommands.forEach(command => {
            !!command.destroy && command.destroy()
        })
    }, [])

    useEffect(() => {
        registry(new Command({
            name: 'undo',
            keyboard: 'ctrl+z',
            followQueue: false,
            execute: () => {
                return {
                    redo: () => {
                        if (state.index === -1) {
                            return
                        }
                        const queueItem = state.queue[state.index]
                        // console.log('queueItem',queueItem)
                        if (!!queueItem) {
                            !!queueItem.undo && queueItem.undo()
                            state.index--
                        }
                    }
                }
            },
            enable: () => {
                return !!state.queue[state.index]
            }
        }))
        registry(new Command({
            name: 'redo',
            keyboard: [
                'ctrl+shift+z',
                'ctrl+y'
            ],
            followQueue: false,
            execute: () => {
                return {
                    redo: () => {
                        const queueItem = state.queue[state.index + 1]
                        if (!!queueItem) {
                            queueItem.redo()
                            state.index++
                        }
                    }
                }
            },
            enable: () => {
                return !!state.queue[state.index + 1]
            }
        }))
        return () => {
            destroy()
        }
    }, [])

    return {
        state,
        registry,
        enable,
        init,
    }
}