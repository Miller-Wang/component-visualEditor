import { VisualEditorProps } from "./visual-editor.props";

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
  props?: Record<string, any>; // 组件的设计属性
  model?: Record<string, any>; // 绑定的字段
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
  render: (data: { props: any; model: any }) => JSX.Element;
  props?: Record<string, VisualEditorProps>;
  model?: Record<string, string>; // 绑定的字段
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
  };
}

export interface BindModelValue {
  field: string;
  row: any;
  binding: {
    value: string;
    onChange: (val: any) => void;
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
          model: Partial<
            {
              [key in keyof Model]: BindModelValue;
            }
          >;
        }) => JSX.Element;
        props?: Props;
        model?: Model;
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
