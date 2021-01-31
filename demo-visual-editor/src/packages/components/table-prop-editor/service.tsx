import { defer } from "@/packages/utils/defer";
import { VisualEditorProps } from "@/packages/visual-editor.props";
import deepcopy from "deepcopy";
import {
  ElButton,
  ElDialog,
  ElTableColumn,
  ElTable,
  ElInput,
} from "element-plus";
import {
  createApp,
  defineComponent,
  getCurrentInstance,
  onMounted,
  PropType,
  reactive,
} from "vue";

const [Dialog, Table, TableColumn, Button]: any[] = [
  ElDialog,
  ElTable,
  ElTableColumn,
  ElButton,
];

export interface TablePropEditorServiceOption {
  data: any[];
  config: VisualEditorProps;
  onConfirm: (data: any) => void;
}

const ServiceComponent = defineComponent({
  props: {
    option: {
      type: Object as PropType<TablePropEditorServiceOption>,
      required: true,
    },
  },

  setup(props) {
    const ctx = getCurrentInstance()!;
    const state = reactive({
      option: props.option,
      showFlag: false,
      mounted: (() => {
        const dfd = defer();
        onMounted(dfd.resolve);
        return dfd.promise;
      })(),
      editorData: [] as any[],
    });

    const methods = {
      service: (option: TablePropEditorServiceOption) => {
        state.option = option;
        state.editorData = deepcopy(option.data || []);
        debugger;
        methods.show();
      },
      show: async () => {
        await state.mounted;
        state.showFlag = true;
      },
      hide: async () => {
        state.showFlag = false;
      },
      add: () => {
        state.editorData.push({});
      },
      reset: () => {
        state.editorData = deepcopy(state.option.data);
      },
    };

    const handler = {
      onConfirm: () => {
        state.option.onConfirm(state.editorData);
        methods.hide();
      },
      onCancel: () => {
        methods.hide();
      },
      onDelete: () => {},
    };

    Object.assign(ctx.proxy!, methods);

    return () => (
      <Dialog v-model={state.showFlag}>
        {{
          default: () => (
            <div>
              <div>
                <Button onClick={methods.add}>添加</Button>
                <Button onClick={methods.reset}>重置</Button>
              </div>
              <Table data={state.editorData}>
                <TableColumn type="index" />
                {state.option.config.table?.options.map((item, index) => (
                  <TableColumn label={item.label}>
                    {{
                      default: ({ row }: { row: any }) => (
                        <ElInput v-model={row[item.field]} />
                      ),
                    }}
                  </TableColumn>
                ))}
                <TableColumn label="操作栏">
                  <Button type="text" onClick={handler.onDelete}>
                    删除
                  </Button>
                </TableColumn>
              </Table>
            </div>
          ),
          footer: () => (
            <>
              <Button onClick={handler.onCancel}> 取消</Button>
              <Button onClick={handler.onConfirm} type="primary">
                确定
              </Button>
            </>
          ),
        }}
      </Dialog>
    );
  },
});

export const $$tablePropEditor = (() => {
  let ins: any;
  return (option: Omit<TablePropEditorServiceOption, "onConfirm">) => {
    if (!ins) {
      const el = document.createElement("div");
      document.body.appendChild(el);
      const app = createApp(ServiceComponent, { option });
      ins = app.mount(el);
    }
    const dfd = defer<any[]>();
    ins.service({
      ...option,
      onConfirm: dfd.resolve,
    });

    return dfd.promise;
  };
})();
