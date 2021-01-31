import deepcopy from "deepcopy";
import {
  ElButton,
  ElColorPicker,
  ElForm,
  ElFormItem,
  ElInput,
  ElInputNumber,
  ElOption,
  ElSelect,
} from "element-plus";
import { defineComponent, PropType, reactive, watch } from "vue";
import { VisualEditorPropsType } from "./visual-editor.props";
import {
  VisualEditorBlockData,
  VisualEditorConfig,
  VisualEditorModelValue,
} from "./visual-editor.utils";

export const VisualOperatorEditor = defineComponent({
  props: {
    block: { type: Object as PropType<VisualEditorBlockData> },
    config: { type: Object as PropType<VisualEditorConfig> },
    dataModel: {
      type: Object as PropType<VisualEditorModelValue>,
      required: true,
    },
    updateBlock: {
      type: Function as PropType<
        (
          newBlock: VisualEditorBlockData,
          oldBlock: VisualEditorBlockData
        ) => void
      >,
      required: true,
    },
    updateModelValue: {
      type: Function as PropType<(...args: any[]) => void>,
      required: true,
    },
  },

  setup(props) {
    let content: JSX.Element;

    const state = reactive({
      editData: {} as any,
    });

    const methods = {
      apply: () => {
        if (!props.block) {
          // 当前编辑容器属性
          props.updateModelValue({
            ...(props.dataModel as any).value,
            container: state.editData,
          });
        } else {
          // 当前编辑block数据属性
          props.updateBlock(
            {
              ...props.block,
              props: state.editData,
            },
            props.block
          );
        }
      },
      reset: () => {
        if (!props.block) {
          state.editData = deepcopy((props.dataModel as any).value.container);
        } else {
          state.editData = deepcopy(props.block.props || {});
        }
      },
    };

    watch(
      () => props.block,
      () => {
        methods.reset();
      },
      {
        immediate: true,
      }
    );

    // const renderComponent = (props: Record<string, VisualEditorProps>) => {};

    return () => {
      if (!props.block) {
        content = (
          <>
            <ElFormItem label="容器宽度">
              <ElInputNumber
                v-model={state.editData.width}
                {...{ step: 100 }}
              />
            </ElFormItem>
            <ElFormItem label="容器高度">
              <ElInputNumber
                v-model={state.editData.height}
                {...{ step: 100 }}
              />
            </ElFormItem>
          </>
        );
      } else {
        const { componentKey } = props.block;
        const component = props.config?.componentMap[componentKey];

        if (!!component && component.props) {
          content = (
            <>
              {Object.entries(component.props).map(([propName, propConfig]) => {
                let item: JSX.Element;
                if (propConfig.type === VisualEditorPropsType.input) {
                  item = <ElInput v-model={state.editData[propName]} />;
                } else if (propConfig.type === VisualEditorPropsType.color) {
                  item = <ElColorPicker v-model={state.editData[propName]} />;
                } else {
                  item = (
                    <ElSelect
                      placeholder="请选择"
                      v-model={state.editData[propName]}
                    >
                      {propConfig.options?.map((opt, i) => (
                        <ElOption key={i} label={opt.label} value={opt.val}>
                          {opt.label}
                        </ElOption>
                      ))}
                    </ElSelect>
                  );
                }

                return (
                  <ElFormItem
                    {...{ labelPosition: "top" }}
                    label={propConfig.label}
                    key={propName}
                  >
                    {item}
                  </ElFormItem>
                );
              })}
            </>
          );
        }
      }
      return (
        <div class="operator">
          <ElForm>
            {content}
            <ElFormItem>
              <ElButton {...({ onClick: methods.apply } as any)}>应用</ElButton>
              <ElButton {...({ onClick: methods.reset } as any)}>重置</ElButton>
            </ElFormItem>
          </ElForm>
        </div>
      );
    };
  },
});
