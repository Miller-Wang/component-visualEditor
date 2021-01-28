import {useCallback, useEffect, useRef, useState} from "react";

export type SimpleFunction = (...args: any[]) => any
type Listener = (SimpleFunction & { fn?: any })
type ListenName = string | symbol
export type PlainEvent = ReturnType<typeof usePlainEvent>

export function usePlainEvent<Option extends { [k: string]: (...args: any[]) => void }>
(option: Option): {
    on: { [k in keyof Option]: (cb: Option[k]) => void },
    once: { [k in keyof Option]: (cb: Option[k]) => void },
    off: { [k in keyof Option]: (cb: Option[k]) => void },
    emit: { [k in keyof Option]: (...args: Parameters<Option[k]>) => void },
} {
    /**
     * 第一次调用getEvents的时候才创建map对象
     * @author  韦胜健
     * @date    2020/10/17 11:27
     */
    const [getListenMap] = useState(() => {
        let events: Map<ListenName, Listener[]>;
        return () => {
            if (!events) {events = new Map<ListenName, Listener[]>()}
            return events
        }
    });
    let hasListener = useRef(false)
    const [event] = useState(() => {
        const event = {
            on: {},
            once: {},
            off: {},
            emit: {},
        } as any
        Object.entries(option).forEach(([name, handler]) => {
            event.on[name] = (fn: SimpleFunction) => {
                hasListener.current = true
                const map = getListenMap()
                const list = map.get(name)
                if (!!list) {
                    list.push(fn)
                } else {
                    map.set(name, [fn])
                }
            }
            event.once[name] = (fn: SimpleFunction) => {
                hasListener.current = true
                const on: Listener = (...args: any[]) => {
                    event.off(name, fn)
                    fn(...args)
                }
                on.fn = fn
                event.on(name, on)
            }
            event.off[name] = (fn: SimpleFunction) => {
                const listenMap = getListenMap()
                const listeners = listenMap.get(name)
                if (!listeners) {return;}
                /*移除listenName的所有监听器*/
                if (!fn) {return listenMap.set(name, [])}
                for (let i = 0; i < listeners.length; i++) {
                    const listener = listeners[i];
                    if (fn === listener || (!!listener.fn && fn === listener.fn)) {
                        listeners.splice(i, 1)
                        break
                    }
                }
            }
            event.emit[name] = (...args: any[]) => {
                handler(...args)
                const listeners = getListenMap().get(name)
                if (!!listeners) {
                    listeners.forEach(listener => listener(...args))
                }
            }
        })
        return event
    })

    useEffect(() => {
        hasListener.current && getListenMap().clear()
    }, [])

    return event
}

/*
const event = createEvent({
    dragstart: (e: DragEvent, name: string) => {}
})

const validListener = (e: DragEvent, name: string) => {
    console.log(e.dataTransfer, name.charAt(0))
}
const invalidListener = (e: DragEvent, name: number) => {
    console.log(e.dataTransfer, name.toPrecision(0))
}

event.on.dragstart(validListener)
event.on.dragstart(invalidListener)

event.off.dragstart(validListener)
event.off.dragstart(invalidListener)

event.once.dragstart(validListener)
event.once.dragstart(invalidListener)

event.emit.dragstart({} as any, '')
event.emit.dragstart({} as any, 123)
*/
