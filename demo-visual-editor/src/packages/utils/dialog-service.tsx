import {
  defineComponent,
  PropType,
  reactive,
  createApp,
  getCurrentInstance,
} from "vue";
import { defer } from "./defer";
import { ElDialog, ElButton, ElInput } from "element-plus";

const Dialog = ElDialog as any;

enum DialogServiceEditType {
  textarea = "textarea",
  input = "input",
}

interface DialogServiceOption {
  title?: string;
  editType?: DialogServiceEditType;
  editReadonly?: boolean;
  editValue?: string | null;
  onConfirm?: (val?: string | null) => void;
}

const keyGenerator = (() => {
  let count = 0;
  return () => `auto_key_${count++}`;
})();

const ServiceComponent = defineComponent({
  props: {
    option: { type: Object as PropType<DialogServiceOption>, required: true },
  },
  setup(props) {
    const ctx = getCurrentInstance()!;
    const state = reactive({
      option: props.option,
      editValue: null as undefined | null | string,
      showFlag: false,
      key: keyGenerator(),
    });
    const methods = {
      service: (option: DialogServiceOption) => {
        state.option = option;
        state.editValue = option.editValue;
        state.key = keyGenerator();
        methods.show();
      },
      show: () => (state.showFlag = true),
      hide: () => (state.showFlag = false),
    };

    const handler = {
      onConfirm: () => {
        state.option.onConfirm!(state.editValue);
        methods.hide();
      },
      onCancel: () => {
        methods.hide();
      },
    };

    // 很重要 把methods给组件的实例
    Object.assign(ctx.proxy, methods);

    return () => (
      <Dialog
        v-model={state.showFlag}
        title={state.option.title}
        key={state.key}
      >
        {{
          default: () => (
            <div>
              {state.option.editType === DialogServiceEditType.textarea ? (
                <ElInput
                  type="textarea"
                  {...{ rows: 10 }}
                  v-model={state.editValue}
                />
              ) : (
                <ElInput v-model={state.editValue} />
              )}
            </div>
          ),
          footer: () => (
            <div>
              <ElButton {...({ onClick: handler.onCancel } as any)}>
                取消
              </ElButton>
              <ElButton {...({ onClick: handler.onConfirm } as any)}>
                确定
              </ElButton>
            </div>
          ),
        }}
      </Dialog>
    );
  },
});

const DialogService = (() => {
  let ins: any;
  return (option: DialogServiceOption) => {
    if (!ins) {
      const el = document.createElement("div");
      document.body.append(el);
      ins = createApp(ServiceComponent, { option }).mount(el);
    }
    ins.service(option);
  };
})();

export const $$dialog = Object.assign(DialogService, {
  input: (initValue?: string, option?: DialogServiceOption) => {
    const dfd = defer<string | undefined | null>();
    const opt: DialogServiceOption = {
      ...option!,
      editType: DialogServiceEditType.input,
      onConfirm: dfd.resolve,
      editValue: initValue,
    };
    DialogService(opt);
    return dfd.promise;
  },
  textarea: (initValue?: string, option?: DialogServiceOption) => {
    const dfd = defer<string | undefined | null>();
    const opt: DialogServiceOption = {
      ...option,
      editType: DialogServiceEditType.textarea,
      onConfirm: dfd.resolve,
      editValue: initValue,
    };
    DialogService(opt);
    return dfd.promise;
  },
});
