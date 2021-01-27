type SimplyListener = (...args: any[]) => void;
export function createEvent() {
  const listeners: SimplyListener[] = [];
  return {
    on: (cb: SimplyListener) => {
      listeners.push(cb);
    },
    off: (cb: SimplyListener) => {
      const index = listeners.indexOf(cb);
      if (index > -1) {
        listeners.slice(index, 1);
      }
    },
    emit: (...args: any[]) => {
      listeners.forEach((item) => item(...args));
    },
  };
}
