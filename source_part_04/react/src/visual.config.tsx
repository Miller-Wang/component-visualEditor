import './visual.config.scss'
import {createVisualEditorOption} from "./packages/editor.utils";
import {createBooleanProp, createColorProp, createModelProp, createSelectProp, createTableProp, createTextProp} from "./packages/editor.props";
import {Button, Input, InputNumber, Select, Switch, Tag} from "antd";
import {PictureOutlined} from "@ant-design/icons";

export const visualEditorBaseOption = createVisualEditorOption()

visualEditorBaseOption.registryComponent('text', {
    name: '文本',
    render: ({props}) => <span style={{color: props.color, fontSize: props.size}}>{props.text || '文本'}</span>,
    preview: () => (
        <div style={{textAlign: 'center', fontSize: '14px'}}>
            普通文本
        </div>
    ),
    props: {
        text: createTextProp({
            label: '显示文本',
            default: '普通文本',
        }),
        color: createColorProp({
            label: '字体颜色',
        }),
        size: createSelectProp({
            label: '字体大小',
            options: [
                {label: '12px', val: '12px'},
                {label: '14px', val: '14px'},
                {label: '16px', val: '16px'},
            ]
        })
    },
})

visualEditorBaseOption.registryComponent('tag', {
    name: '标签',
    render: ({props}) =>
        <Tag
            color={props.color}
            closable={props.closable}>
            {props.text || '标签'}
        </Tag>,
    preview: () => (
        <div style={{textAlign: 'center'}}>
            <Switch/>
        </div>
    ),
    model: {
        modelValue: createModelProp({label: '绑定字段',}),
    },
    props: {
        text: createTextProp({label: '标签文本',}),
        closable: createBooleanProp({label: '是否可关闭'}),
        color: createColorProp({label: '标签颜色'}),
    },
})

visualEditorBaseOption.registryComponent('button', {
    name: '按钮',
    render: ({props, custom, block}) => (
        <Button
            ghost={props.ghost}
            style={{
                width: `${block.width || '68'}px`,
                height: `${block.height || '32'}px`,
            }}
            type={props.type}
            size={props.size || 'default'}
            {...custom}>
            {props.label || '按钮'}
        </Button>
    ),
    resize: {
        height: true,
        width: true,
    },
    preview: () => (
        <div style={{textAlign: 'center'}}>
            <Button>主要按钮</Button>
        </div>
    ),
    props: {
        label: createTextProp({label: '按钮文本'}),
        ghost: createBooleanProp({label: '是否为朴素按钮'}),
        type: createSelectProp({
            label: '按钮类型',
            options: [
                {label: '默认', val: 'default'},
                {label: '基础', val: 'primary'},
                {label: '线框', val: 'ghost'},
                {label: '虚线', val: 'dashed'},
                {label: '链接', val: 'link'},
                {label: '文本', val: 'text'},
            ]
        }),
        size: createSelectProp({
            label: '大小尺寸',
            options: [
                {label: '大', val: 'large'},
                {label: '中', val: 'middle'},
                {label: '小', val: 'small'},
            ]
        }),
    },
})

visualEditorBaseOption.registryComponent('image', {
    name: '图片',
    resize: {
        width: true,
        height: true,
    },
    render: ({props, block}) => {
        return (
            <div style={{height: `${block.height || 100}px`, width: `${block.width || 100}px`}} className="visual-block-image">
                <img src={props.url || 'https://cn.vuejs.org/images/logo.png'}/>
            </div>
        )
    },
    preview: () => (
        <div style={{textAlign: 'center'}}>
            <div style={{
                fontSize: '20px',
                backgroundColor: '#f2f2f2',
                color: '#ccc',
                display: 'inline-flex',
                width: '100px',
                height: '50px',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <PictureOutlined/>
            </div>
        </div>
    ),
    props: {
        url: createTextProp({label: '地址'})
    },
})

visualEditorBaseOption.registryComponent('input', {
    name: '输入框',
    resize: {
        width: true,
    },
    render: ({model, custom, block}) => {
        return <Input style={{width: `${block.width || 225}px`}}{...model.modelValue}{...custom}/>
    },
    preview: () => (
        <div style={{textAlign: 'center'}}>
            <Input/>
        </div>
    ),
    model: {
        modelValue: createModelProp({label: '绑定字段',}),
    },
})

visualEditorBaseOption.registryComponent('number', {
    name: '计数器',
    render: ({props, model}) => <InputNumber style={{width: `${props.width || 225}px`}} {...model.modelValue}/>,
    preview: () => (
        <div style={{textAlign: 'center'}}>
            <InputNumber controls-position="right" style={{width: '100%'}}/>
        </div>
    ),
    model: {
        modelValue: createModelProp({label: '绑定字段',}),
    },
})

visualEditorBaseOption.registryComponent('select', {
    name: '下拉选择',
    render: ({props, model}) => {
        return (
            <Select
                key={props.options.length}
                style={{width: `${225}px`}}
                {...(!!model.modelValue ? model.modelValue : {})}>
                {(props.options || []).map((opt: any, i: number) =>
                    <Select.Option value={opt.value} key={i}>{opt.label}</Select.Option>
                )}
            </Select>
        )
    },
    preview: () => (
        <div style={{textAlign: 'center'}}>
            <Select placeholder="请选择" value={"dangao"} style={{width: '100%'}}>
                <Select.Option value={"dangao"}>蛋糕</Select.Option>
                <Select.Option value={"生煎"}>shengjian</Select.Option>
            </Select>
        </div>
    ),
    model: {
        modelValue: createModelProp({label: '绑定字段',}),
    },
    props: {
        options: createTableProp({
            label: '下拉选项',
            showField: 'label',
            columns: [
                {label: '显示值', field: 'label'},
                {label: '绑定值', field: 'value'},
            ],
        })
    },
})