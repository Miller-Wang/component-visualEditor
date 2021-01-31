import { createVisualEditorConfig } from "./visual-editor.utils";
import { ElButton, ElInput } from "element-plus";
import {
  createEditorColorProps,
  createEditorInputProps,
  createEditorSelectProps,
} from "./visual-editor.props";

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
  render: ({ props }) => (
    <ElButton type={props.type} size={props.size}>
      {props.text || "按钮"}
    </ElButton>
  ),
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
  render: () => <ElInput />,
  props: {
    text: createEditorInputProps("显示文本"),
    size: createEditorSelectProps("输入框大小", [
      { label: "默认", val: "" },
      { label: "中等", val: "medium" },
      { label: "小", val: "small" },
      { label: "极小", val: "mini" },
    ]),
  },
});

export default visualConfig;
