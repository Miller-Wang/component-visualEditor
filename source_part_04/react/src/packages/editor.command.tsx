import {VisualEditorBlock, VisualEditorModelValue} from "./editor.utils";
import {Command, useCommander} from "./plugins/command";
import deepcopy from 'deepcopy'
import {useEffect} from "react";

export function useVisualCommander(
    {
        focusData,
        dataModel,
        methods,
        event,
    }: {
        dataModel: { value: VisualEditorModelValue },
        focusData: { current: { focus: VisualEditorBlock[], notFocus: VisualEditorBlock[], } },
        methods: {
            updateBlocks: (blocks: VisualEditorBlock[]) => void,
        },
        event: {
            on: {
                dragstart: (cb: () => void) => void,
                dragend: (cb: () => void) => void,
            },
            off: {
                dragstart: (cb: () => void) => void,
                dragend: (cb: () => void) => void,
            }
        },
    }) {
    const commander = useCommander()

    useEffect(() => {
        /*删除*/
        commander.registry(new Command({
            name: 'delete',
            keyboard: [
                'ctrl+d',
                'backspace',
                'delete',
            ],
            enable: () => focusData.current.focus.length > 0,
            execute() {
                let before: null | VisualEditorBlock[] = null
                let after: null | VisualEditorBlock[] = null
                return {
                    redo: () => {
                        if (!before && !after) {
                            before = deepcopy(dataModel.value.blocks)
                            const {notFocus} = focusData.current
                            methods.updateBlocks(notFocus)
                            after = deepcopy(notFocus)
                        } else {
                            methods.updateBlocks(after!)
                        }
                    },
                    undo: () => methods.updateBlocks(before!),
                }
            },
        }))
        /*清空*/
        commander.registry(new Command({
            name: 'clear',
            execute() {
                let before: null | VisualEditorBlock[] = null
                let after: null | VisualEditorBlock[] = null
                return {
                    redo: () => {
                        if (!before && !after) {
                            before = deepcopy(dataModel.value.blocks)
                            methods.updateBlocks([])
                            after = []
                        } else {
                            methods.updateBlocks(after!)
                        }
                    },
                    undo: () => methods.updateBlocks(before!),
                }
            },
        }))
        /*全选*/
        commander.registry(new Command({
            name: 'selectAll',
            keyboard: [
                'ctrl+a',
            ],
            followQueue: false,
            execute: () => {
                return {
                    redo: () => {
                        dataModel.value.blocks.forEach(block => block.focus = true)
                    },
                }
            },
        }))
        /*更新 modelValue*/
        commander.registry(new Command({
            name: 'updateModelValue',
            execute: (newModelValue: VisualEditorModelValue) => {
                let before: undefined | VisualEditorModelValue = undefined
                let after: undefined | VisualEditorModelValue = undefined
                return {
                    redo: () => {
                        if (!before && !after) {
                            before = deepcopy(dataModel.value)
                            dataModel.value = deepcopy(newModelValue)
                            after = deepcopy(newModelValue)
                        } else {
                            dataModel.value = deepcopy(after!)
                        }
                    },
                    undo: () => dataModel.value = deepcopy(before!),
                }
            },
        }))
        /*拖拽*/
        commander.registry(new Command({
            name: 'drag',
            doNothingWhenExecute: true,
            init() {
                this.data = {
                    ondragstart: () => {
                        this.data = {
                            ...this.data,
                            start: deepcopy(dataModel.value.blocks)
                        }
                    },
                    ondragend: () => {
                        this.data = {
                            ...this.data,
                            end: deepcopy(dataModel.value.blocks)
                        }
                        /*
                        * 执行execute；
                        * 设置doNothingWhenExecute为true，不执行redo，因为拖拽结束的时候数据已经是最新的了，没必要再更新数据；
                        * 将undo、redo加入到command queue中；
                        */
                        commander.state.commands.drag()
                    },
                }
                event.on.dragstart(this.data.ondragstart)
                event.on.dragend(this.data.ondragend)
            },
            destroy() {
                event.off.dragstart(this.data.ondragstart)
                event.off.dragend(this.data.ondragend)
            },
            execute() {
                const {start, end} = this.data
                return {
                    redo: () => {
                        methods.updateBlocks(deepcopy(end))
                    },
                    undo: () => {
                        methods.updateBlocks(deepcopy(start))
                    },
                }
            },
        }))
        /*置顶*/
        commander.registry(new Command({
            name: 'placeTop',
            keyboard: [
                'ctrl+up'
            ],
            enable: () => focusData.current.focus.length > 0,
            execute() {
                let before: null | VisualEditorBlock[] = null
                let after: null | VisualEditorBlock[] = null
                return {
                    redo: () => {
                        if (!before && !after) {
                            before = deepcopy(dataModel.value.blocks)
                            const {focus, notFocus} = focusData.current
                            const maxZIndex = notFocus.reduce((prev, item) => item.zIndex > prev ? item.zIndex : prev, 0) + 1
                            focus.forEach(block => block.zIndex = maxZIndex)
                            after = deepcopy(notFocus)
                        } else {
                            methods.updateBlocks(after!)
                        }
                    },
                    undo: () => methods.updateBlocks(before!),
                }
            },
        }))
        /*置底*/
        commander.registry(new Command({
            name: 'placeBottom',
            keyboard: [
                'ctrl+bottom'
            ],
            enable: () => focusData.current.focus.length > 0,
            execute() {
                let before: null | VisualEditorBlock[] = null
                let after: null | VisualEditorBlock[] = null
                return {
                    redo: () => {
                        if (!before && !after) {
                            before = deepcopy(dataModel.value.blocks)
                            const {focus, notFocus} = focusData.current
                            const maxZIndex = notFocus.reduce((prev, item) => item.zIndex < prev ? item.zIndex : prev, 0) - 1
                            if (maxZIndex >= 0) {
                                focus.forEach(block => block.zIndex = maxZIndex)
                            } else {
                                focus.forEach(block => block.zIndex = 0)
                                notFocus.forEach(block => block.zIndex++)
                            }
                            after = deepcopy(notFocus)
                        } else {
                            methods.updateBlocks(after!)
                        }
                    },
                    undo: () => methods.updateBlocks(before!),
                }
            },
        }))


        /*初始化命令以及事件*/
        commander.init()
    }, [])

    return {
        enable: commander.enable,
        delete: () => commander.state.commands.delete(),
        clear: () => commander.state.commands.clear(),
        undo: () => commander.state.commands.undo(),
        redo: () => commander.state.commands.redo(),
        placeTop: () => commander.state.commands.placeTop(),
        placeBottom: () => commander.state.commands.placeBottom(),
        updateModelValue: (newModelValue: VisualEditorModelValue) => commander.state.commands.updateModelValue(newModelValue),
    }
}