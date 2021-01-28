import {VisualEditorBlock, VisualEditorOption} from "./editor.utils";
import {useEffect, useRef} from "react";
import deepcopy from 'deepcopy'
import classnames from 'classnames'
import {Alert} from "antd";

export type VisualSlotRenderData = { block: VisualEditorBlock, props: Record<string, any>, custom: Record<string, any>, model: any }
export type VisualSlot = Record<string, (data: VisualSlotRenderData) => JSX.Element>

export const VisualEditorBlockRender: React.FC<{
    data: VisualEditorBlock,
    option: VisualEditorOption,
    formData: Record<string, any>,
    preview?: boolean,
    editSlots?: VisualSlot,
    customBlockProps?: Record<string, (() => Record<string, any>) | Record<string, any>>,

    onMousedown?: (e: React.MouseEvent<HTMLDivElement>) => void,
    onContextMenu?: (e: React.MouseEvent<HTMLDivElement>) => void,
    onAdjustPosition: (newBlock: VisualEditorBlock, oldBlock: VisualEditorBlock) => void,
}> = (props) => {

    const el = useRef({} as HTMLDivElement)

    useEffect(() => {
        const {offsetWidth, offsetHeight} = el.current;
        const data = deepcopy(props.data);

        if (!data.width) data.width = offsetWidth
        if (!data.height) data.height = offsetHeight

        if (props.data.adjustPosition) {
            data.left = props.data.left - offsetWidth / 2;
            data.top = props.data.top - offsetHeight / 2;
            data.adjustPosition = false
            props.onAdjustPosition(data, props.data)
        }
    }, [])

    const {data, option} = props
    const renderProps = {
        block: {
            style: {
                top: `${data.top}px`,
                left: `${data.left}px`,
                zIndex: data.zIndex,
            } as any,
        }
    }
    const Component = option.componentMap[data.componentKey]
    // console.log(Component, option.componentMap, data.componentKey)

    const renderData = {
        block: data,
        props: data.props || {},
        custom: (() => {
            if (!(!!props.customBlockProps && !!data.slotName && !!props.customBlockProps[data.slotName])) {
                return {}
            }
            const c = props.customBlockProps[data.slotName]
            return typeof c === "function" ? c() : c
        })(),
        model: (() => {
            /*const models = Object.entries(Component.model || {})
            if (models.length === 0 || !data.model) return {}
            const formData = props.formData as Record<string, any>

            return models.reduce((prev, [modifier]) => {
                const bindField = data.model![modifier]
                prev[modifier] = {
                    [modifier]: formData[bindField],
                    [`onUpdate:${modifier}`]: (val: any) => formData[bindField] = val,
                }
                return prev
            }, {} as Record<string, Record<string, any>>)*/
            return {}
        })(),
    }
    let Render: any = null
    if (!!Component) {
        if (!!data.slotName && props.editSlots && !!props.editSlots[data.slotName]) {
            Render = props.editSlots[data.slotName](renderData)
        } else {
            Render = Component.render(renderData)
        }
    } else {
        Render = <Alert message={`${data.componentKey} is not exist!`} type="error" showIcon/>
    }

    return (
        <div className={classnames(['vue-visual-block', {'vue-visual-block-focus': data.focus,}])}
             {...renderProps.block}
             ref={el}
             onMouseDown={props.onMousedown}
             onContextMenu={props.onContextMenu}
        >
            {Render}
            {/*{!props.preview && !!Component.resize && data.focus && <BlockResize resize={Component.resize} block={data}/>}*/}
        </div>
    )
}