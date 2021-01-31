import { useModel } from "@/packages/utils/useModel";
import { VisualEditorProps } from "@/packages/visual-editor.props";
import { defineComponent, PropType } from "vue";
import { ElButton, ElTag } from "element-plus";
import "./style.scss";
import { $$tablePropEditor } from "./service";

const Button = ElButton as any;

export const TablePropEditor = defineComponent({
  props: {
    modelValue: { type: Array as PropType<any[]> },
    propConfig: { type: Object as PropType<VisualEditorProps>, required: true },
  },
  emits: {
    "update:modelValue": (val?: any[]) => true,
  },
  setup(props, ctx) {
    const model = useModel(
      () => props.modelValue,
      (val) => ctx.emit("update:modelValue", val)
    );

    const onClick = async () => {
      const data = await $$tablePropEditor({
        config: props.propConfig,
        data: props.modelValue || [],
      });
      console.log(data);
      model.value = data;
    };

    return () => (
      <div>
        {(!model.value || model.value.length === 0) && (
          <Button onClick={onClick} type="primary">
            添加
          </Button>
        )}
        {(model.value || []).map((item) => (
          <ElTag>{item[props.propConfig.table?.showKey || ""]}</ElTag>
        ))}
      </div>
    );
  },
});
