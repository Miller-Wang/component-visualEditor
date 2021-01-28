import {VisualEditorProp} from "./editor.props";

export interface VisualEditorBlock {
    componentKey: string,
    focus: boolean,
    top: number,
    left: number,
    height: number,
    width: number,
    slotName?: string,
    adjustPosition?: boolean,
    zIndex: number,
    props?: Record<string, any>,
    model?: Record<string, string>,
}

export interface VisualEditorModelValue {
    container: {
        height: number,                                             // 容器高度
        width: number,                                              // 容器宽度
    },
    blocks: VisualEditorBlock[],                                    // block数据
}

export interface VisualEditorComponent {
    key?: string,
    preview: () => JSX.Element,
    name: string,
    render: (data: {
        props: Record<string, any>,
        block: VisualEditorBlock,
        model: Record<string, Record<string, any>>,
        custom: { [k: string]: any },
    }) => any,
    props?: { [k: string]: VisualEditorProp },
    model?: { [k: string]: VisualEditorProp },
    resize?: {
        width?: boolean,
        height?: boolean,
    },
}

export type VisualEditorOption = ReturnType<typeof createVisualEditorOption>

export function createVisualEditorOption() {

    const componentMap: { [k: string]: VisualEditorComponent } = {}
    const componentList: VisualEditorComponent[] = []

    function registryComponent<_,
        Props extends { [k: string]: VisualEditorProp },
        Model extends { [k: string]: VisualEditorProp },
        >(key: string, component: {
        key?: string,
        preview: () => JSX.Element,
        name: string,
        render: (data: {
            props: { [k in keyof Props]: any },
            block: VisualEditorBlock,
            model: { [k in keyof Model]: Record<string, any> },
            custom: { [k: string]: any },
        }) => any,
        props?: Props,
        model?: Model,
        resize?: {
            width?: boolean,
            height?: boolean,
        },
    }) {
        component.key = key
        if (!!componentMap[key]) {
            const index = componentList.indexOf(componentMap[key])
            componentList.splice(index, 1)
        }
        componentMap[key] = component as any
        componentList.push(component as any)
    }

    return {
        componentMap,
        componentList,
        registryComponent,
    }
}