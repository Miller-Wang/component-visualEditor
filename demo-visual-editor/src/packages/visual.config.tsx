import { createVisualEditorConfig } from "./visual-editor.utils";
import { ElButton, ElInput as Input, ElOption, ElSelect } from "element-plus";
import {
  createEditorColorProps,
  createEditorInputProps,
  createEditorSelectProps,
  createEditorTableProp,
} from "./visual-editor.props";
import { NumberRange } from "./components/number-range";
import "../visual.config.scss";

const [ElInput]: any[] = [Input];

const visualConfig = createVisualEditorConfig();

visualConfig.registry("text", {
  label: "文本",
  preview: () => "预览文本",
  render: ({ props }) => (
    <span style={{ color: props.color, fontSize: props.size }}>
      {props.text || "默认文本"}
    </span>
  ),
  props: {
    text: createEditorInputProps("显示文本"),
    color: createEditorColorProps("字体颜色"),
    size: createEditorSelectProps("字体大小", [
      { label: "14px", val: "14px" },
      { label: "18px", val: "18px" },
      { label: "24px", val: "24px" },
    ]),
  },
});

visualConfig.registry("button", {
  label: "按钮",
  preview: () => <ElButton>按钮</ElButton>,
  render: ({ props, size }) => (
    <ElButton
      type={props.type}
      size={props.size}
      style={{ width: `${size.width}px`, height: `${size.height}px` }}
    >
      {props.text || "按钮"}
    </ElButton>
  ),
  resize: { width: true, height: true },
  props: {
    text: createEditorInputProps("显示文本"),
    type: createEditorSelectProps("按钮类型", [
      { label: "基础", val: "primary" },
      { label: "成功", val: "success" },
      { label: "警告", val: "warning" },
      { label: "危险", val: "danger" },
      { label: "提示", val: "info" },
      { label: "文本", val: "text" },
    ]),
    size: createEditorSelectProps("按钮大小", [
      { label: "默认", val: "" },
      { label: "中等", val: "medium" },
      { label: "小", val: "small" },
      { label: "极小", val: "mini" },
    ]),
  },
});

visualConfig.registry("input", {
  label: "输入框",
  preview: () => <ElInput />,
  render: ({ model, size }) => {
    return <ElInput {...model.default} style={{ width: `${size.width}px` }} />;
  },
  resize: { width: true },
  model: {
    default: "绑定字段",
  },
  props: {
    size: createEditorSelectProps("输入框大小", [
      { label: "默认", val: "" },
      { label: "中等", val: "medium" },
      { label: "小", val: "small" },
      { label: "极小", val: "mini" },
    ]),
  },
});

visualConfig.registry("select", {
  label: "下拉框",
  preview: () => <ElSelect></ElSelect>,
  render: ({ props }) => (
    <ElSelect key={Math.random()}>
      {(props.options || []).map(
        (
          opt: {
            label: string;
            value: string;
          },
          index: number
        ) => (
          <ElOption label={opt.label} value={opt.value} key={index}></ElOption>
        )
      )}
    </ElSelect>
  ),
  props: {
    options: createEditorTableProp("下拉选项", {
      options: [
        { label: "显示值", field: "label" },
        { label: "绑定值", field: "value" },
      ],
      showKey: "label",
    }),
  },
});

visualConfig.registry("number-range", {
  label: "数字范围输入框",
  resize: { width: true },
  preview: () => <NumberRange style={{ width: "100%" }} />,
  render: ({ model, size }) => (
    <NumberRange
      style={{ width: `${size.width}px` }}
      {...{
        start: model.start.value,
        "onUpdate:start": model.start.onChange,
        end: model.end.value,
        "onUpdate:end": model.end.onChange,
      }}
    />
  ),

  model: {
    start: "起始绑定字段",
    end: "结束绑定字段",
  },
});

export default visualConfig;
