import { VisualEditorProps } from "./visual-editor.props";
import { provide, inject } from "vue";
export interface VisualEditorBlockData {
  top: number;
  left: number;
  componentKey: string;
  adjustPosition: boolean; // 是否需要调整位置
  focus: boolean; // 是否是选中状态
  zIndex: number; // z-index值
  width: number;
  height: number;
  hasResize: boolean; // 是否调整过宽高
  props: Record<string, any>; // 组件的设计属性
  model: Record<string, any>; // 绑定的字段
  slotName?: string; // 组件唯一标识
}

export interface VisualEditorModelValue {
  container: {
    width: number;
    height: number;
  };
  blocks: VisualEditorBlockData[];
}

export interface VisualEditorComponent {
  key: string;
  label: string;
  preview: () => JSX.Element;
  render: (data: {
    props: any;
    model: any;
    size: { width?: number; height?: number };
    custom: Record<string, any>;
  }) => JSX.Element;
  props?: Record<string, VisualEditorProps>;
  model?: Record<string, string>; // 绑定的字段
  resize?: { width?: boolean; height?: boolean };
}

export function createNewBlock(data: {
  component: VisualEditorComponent;
  top: number;
  left: number;
}): VisualEditorBlockData {
  return {
    componentKey: data.component!.key,
    top: data.top,
    left: data.left,
    adjustPosition: true,
    focus: false,
    zIndex: 0,
    width: 0,
    height: 0,
    hasResize: false,
    props: {},
    model: {},
  };
}

export function createVisualEditorConfig() {
  const componentList: VisualEditorComponent[] = [];
  const componentMap: Record<string, VisualEditorComponent> = {};

  return {
    componentList,
    componentMap,
    registry: <
      Props extends Record<string, VisualEditorProps>,
      Model extends Record<string, string> = {}
    >(
      key: string,
      component: {
        label: string;
        preview: () => JSX.Element;
        render: (data: {
          props: { [k in keyof Props]: any };
          model: Partial<{ [key in keyof Model]: any }>;
          size: { width?: number; height?: number };
          custom: Record<string, any>;
        }) => JSX.Element;
        props?: Props;
        model?: Model;
        resize?: { width?: boolean; height?: boolean };
      }
    ) => {
      const comp = { ...component, key };
      componentList.push(comp);
      componentMap[key] = comp;
    },
  };
}

// 配置类型
export type VisualEditorConfig = ReturnType<typeof createVisualEditorConfig>;

export interface VisualEditorMarkLine {
  x: { left: number; showLeft: number }[];
  y: { top: number; showTop: number }[];
}

export interface VisualDragEvent {
  dragstart: {
    on: (cb: () => void) => void;
    off: (cb: () => void) => void;
    emit: () => void;
  };
  dragend: {
    on: (cb: () => void) => void;
    off: (cb: () => void) => void;
    emit: () => void;
  };
}

export const VisualDragProvider = (() => {
  const VISUAL_DRAG_PROVIDER = "@@VISUAL_DRAG_PROVIDER";
  return {
    provide: (data: VisualDragEvent) => {
      provide(VISUAL_DRAG_PROVIDER, data);
    },
    inject: () => {
      return inject(VISUAL_DRAG_PROVIDER) as VisualDragEvent;
    },
  };
})();
