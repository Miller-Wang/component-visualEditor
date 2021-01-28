export function delay(dur = 0) {
    return new Promise<void>((resolve) => setTimeout(resolve, dur))
}