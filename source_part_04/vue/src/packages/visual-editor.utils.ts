export interface VisualEditorBlockData {
    componentKey: string,                           // 映射 VisualEditorConfig 中 componentMap 的 component对象
    top: number,                                    // 组件的top定位
    left: number,                                   // 组件的left定位
    adjustPosition: boolean,                        // 是否需要调整位置
    focus: boolean,                                 // 当前是否为选中状态
    zIndex: number,                                 // z-index值
    width: number,                                  // 组件宽度
    height: number,                                 // 组件高度
    hasResize: boolean,                             // 是否调整过宽度或者高度
}

export interface VisualEditorModelValue {
    container: {
        width: number,
        height: number,
    },
    blocks?: VisualEditorBlockData[],
}

export interface VisualEditorComponent {
    key: string,
    label: string,
    preview: () => JSX.Element,
    render: () => JSX.Element,
}

export interface VisualEditorMarkLines {
    x: { left: number, showLeft: number }[],
    y: { top: number, showTop: number }[]
}

export function createNewBlock(
    {
        component,
        left,
        top,
    }: {
        component: VisualEditorComponent,
        top: number,
        left: number,
    }): VisualEditorBlockData {
    return {
        top,
        left,
        componentKey: component!.key,
        adjustPosition: true,
        focus: false,
        zIndex: 0,
        width: 0,
        height: 0,
        hasResize: false,
    }
}

export function createVisualEditorConfig() {
    const componentList: VisualEditorComponent[] = []
    const componentMap: Record<string, VisualEditorComponent> = {}
    return {
        componentList,
        componentMap,
        registry: (key: string, component: Omit<VisualEditorComponent, 'key'>) => {
            let comp = {...component, key}
            componentList.push(comp)
            componentMap[key] = comp
        }
    }
}

export type VisualEditorConfig = ReturnType<typeof createVisualEditorConfig>