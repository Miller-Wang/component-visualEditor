import {useCallback, useEffect, useRef, useState} from "react";

/**
 * 双向绑定辅助函数

 const model = useModel(props.value, props.onChange)

 model.value = newVal   会触发视图更新以及 props.onChange
 model.value            一直是最新的数据
 model.value.onChange   用来处理绑定值变化的动作

 * @author  韦胜健
 * @date    2021/1/14 11:27
 */
export function useModel<T>(propsValue: T, propsEmitter?: (val: T) => void, config?: { autoWatch?: boolean | undefined, autoEmit?: boolean | undefined }) {
    config = config || {}
    /*缓存值，保证在修改变量之后，通过current获取到的是最新的修改过的值*/
    const current = useRef(propsValue)
    /*只需要setValue，触发视图更新*/
    const [, setValue] = useState(() => propsValue)
    /*监听props值变化，更新current 与 value，并触发视图更新*/
    if (config.autoWatch !== false) {
        useEffect(() => {
            setValue(propsValue)
            current.current = propsValue
        }, [propsValue]);
    }
    /*model对象不需要变*/
    const [model] = useState(() => ({
        get value(): T {
            return current.current
        },
        set value(val: T) {
            current.current = val
            setValue(val)
            if (config!.autoEmit !== false) {
                !!propsEmitter && propsEmitter(val)
            }
        },
        onChange: (val: T | React.ChangeEvent<any>) => {
            if ('target' in val) {
                model.value = val.target.value
            } else {
                model.value = val
            }
        }
    }))
    return model
}

export const TestUseModelComponent: React.FC<{
    value?: string,
    onChange?: (val?: string) => void,
    inputProps?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
}> = (props) => {

    const model = useModel(props.value, props.onChange)
    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        model.value = e.target.value
    }, [])

    const onClick = useCallback((e: React.MouseEvent<HTMLInputElement>) => {
        console.log(e.target)
        console.log(model.value)
        e.stopPropagation()
        e.preventDefault()
    }, [])

    return (
        <input {...{
            type: 'text',
            value: model.value,
            onChange: model.onChange,
        }}/>
    )
}

export const TestUseModelPage = () => {
    const [text, setText] = useState('hello world' as string | undefined)
    return (
        <div>
            <h4>测试 useModel </h4>
            <TestUseModelComponent value={text} onChange={setText}/>
            text:{text}
        </div>
    )
}
