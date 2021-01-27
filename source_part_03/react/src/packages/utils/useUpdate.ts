import {useCallback, useState} from "react";

export function useUpdate() {
    const [count, setState] = useState(0)
    return {
        forceUpdate: useCallback(() => {
            setState(count + 1)
        }, [])
    }
}