export enum VisualEditorPropType {
    text = 'text',
    select = 'select',
    color = 'color',
    boolean = 'boolean',
    model = 'model',
    table = 'table',
}

interface BasePropConfig {
    label: string,
    default?: any,
}

export interface VisualEditorProp extends BasePropConfig, Partial<SelectProp>, Partial<TableProp> {
    type: VisualEditorPropType,
}

/*---------------------------------------model-------------------------------------------*/

export function createModelProp(config: BasePropConfig): VisualEditorProp {
    return Object.assign(config, {
        type: VisualEditorPropType.model,
    })
}

/*---------------------------------------text-------------------------------------------*/

export function createTextProp(config: BasePropConfig): VisualEditorProp {
    return Object.assign(config, {
        type: VisualEditorPropType.text,
    })
}

/*---------------------------------------select-------------------------------------------*/
interface SelectProp {
    options: { label: string, val: any }[]
}

export function createSelectProp(config: BasePropConfig & SelectProp) {
    return Object.assign(config, {
        type: VisualEditorPropType.select,
    })
}

/*---------------------------------------color-------------------------------------------*/
interface ColorProp {
    showAlpha?: boolean
    colorFormat?: string
}

export function createColorProp(config: BasePropConfig & ColorProp) {
    return Object.assign(config, {
        type: VisualEditorPropType.color,
    })
}

/*---------------------------------------boolean-------------------------------------------*/

export function createBooleanProp(config: BasePropConfig) {
    return Object.assign(config, {
        type: VisualEditorPropType.boolean,
    })
}

/*---------------------------------------table-------------------------------------------*/

interface TableProp {
    showField: string,
    columns: {
        label: string,
        field: string,
    }[]
}

export function createTableProp(config: BasePropConfig & TableProp) {
    return Object.assign(config, {
        type: VisualEditorPropType.table
    })
}