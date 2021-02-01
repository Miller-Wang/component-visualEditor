import {
  computed,
  createApp,
  defineComponent,
  getCurrentInstance,
  inject,
  onBeforeUnmount,
  onMounted,
  PropType,
  provide,
  reactive,
  ref,
} from "vue";
import { defer } from "./defer";
import "./dropdown-service.scss";

interface DropdownServiceOption {
  reference: MouseEvent | HTMLElement;
  content: () => JSX.Element;
}

const DropdownServiceProvider = (() => {
  const DROPDOWN_SERVICE_PROVIDER = "@@DROPDOWN_SERVICE_PROVIDER";
  return {
    provide: (handler: { onClick: () => void }) => {
      provide(DROPDOWN_SERVICE_PROVIDER, handler);
    },
    inject: () => {
      return inject(DROPDOWN_SERVICE_PROVIDER) as { onClick: () => void };
    },
  };
})();

const SerivceComponent = defineComponent({
  props: { option: { type: Object as PropType<DropdownServiceOption> } },

  setup(props) {
    const ctx = getCurrentInstance()!;
    const el = ref({} as HTMLDivElement);

    const state = reactive({
      option: props.option,
      showFlag: false,
      top: 0,
      left: 0,
      mounted: (() => {
        const dfd = defer();
        onMounted(dfd.resolve);
        return dfd.promise;
      })(),
    });

    const methods = {
      show: async () => {
        await state.mounted;
        state.showFlag = true;
      },
      hide: async () => {
        state.showFlag = false;
      },
    };

    const service = (option: DropdownServiceOption) => {
      state.option = option;
      state.showFlag = true;
      if ("addEventListener" in option.reference) {
        console.log(option.reference);
        const { top, left, height } = option.reference.getBoundingClientRect();
        state.top = top + height;
        state.left = left;
      } else {
        const { clientX, clientY } = option.reference;
        state.left = clientX;
        state.top = clientY;
      }
      methods.show();
    };

    const classes = computed(() => [
      "dropdown-service",
      {
        "dropdown-service-show": state.showFlag,
      },
    ]);
    const style = computed(() => ({
      top: `${state.top}px`,
      left: `${state.left}px`,
    }));

    Object.assign(ctx.proxy, { service });

    const onMousedownDocument = (e: MouseEvent) => {
      if (!el.value.contains(e.target as HTMLElement)) {
        methods.hide();
      }
    };
    onMounted(() =>
      document.body.addEventListener("mousedown", onMousedownDocument, true)
    );

    onBeforeUnmount(() =>
      document.body.removeEventListener("mousedown", onMousedownDocument, true)
    );

    DropdownServiceProvider.provide({ onClick: methods.hide });

    return () => (
      <div class={classes.value} style={style.value} ref={el}>
        {state.option?.content()}
      </div>
    );
  },
});

export const DropdownOption = defineComponent({
  props: {
    label: { type: String },
    icon: { type: String },
  },
  emits: {
    click: (e: MouseEvent) => true,
  },
  setup(props, ctx) {
    const { onClick: dropdownClickHandler } = DropdownServiceProvider.inject();
    const handler = {
      onClick: (e: MouseEvent) => {
        ctx.emit("click", e);
        dropdownClickHandler();
      },
    };
    return () => (
      <div class="dropdown-option" onClick={handler.onClick}>
        <i class={`iconfont ${props.icon}`}></i>
        <span>{props.label}</span>
      </div>
    );
  },
});

export const $$dropdown = (() => {
  let ins: any;
  return (option: DropdownServiceOption) => {
    if (!ins) {
      const el = document.createElement("div");
      document.body.appendChild(el);
      const app = createApp(SerivceComponent, { option });
      ins = app.mount(el);
    }
    ins.service(option);
  };
})();
