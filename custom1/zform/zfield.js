import { behavior as computedBehavior } from 'miniprogram-computed'
import bform__behavior from './bform__behavior'


export function createFieldComponent() {
  Component({
    options: {
      styleIsolation: 'apply-shared',
    },
    behaviors: [bform__behavior, computedBehavior],
    // externalClasses: ['class'],
    relations: {
      'bform__behavior': {
        type: 'ancestor', // 关联的目标节点应为祖先节点
      }
    },
    properties: {
      formId: {
        type: String
      },
      prop: {
        type: String,
      },
      binds: {
        type: Object
      },
      pathArr: {
        type: Array
      },
      configPath: {
        type: String
      },
      debug: {
        type: Boolean
      }
    },
    data: {
      innerValue: undefined,
      options: [
        {
          label: '1de',
          value: '1de'
        },
        {
          label: '2de',
          value: '2de'
        }
      ],
      direction: 'left',
      pickerIndex: 0,
      optionCurrent: {},
      fieldPath: '',
      inited: false,
      uiConfig: {},
    },
    lifetimes: {
      ready() {
        let config = this.zform__getFieldConfig(this.data.formId,  this.data.configPath);
        let form = this.getFormRef();
        // console.log(form.zformi_formWidgetConfig());
        this.setData({
          fieldPath: this.zform__getObjPathFromPathArr(this.data.pathArr),
          uiConfig: config?.ui ?? {},
          formWigetConfig: form.zformi_formWidgetConfig(),
          inited: true
        })
      }
    },
    methods: {

      getFormRef() {
        return this.getForm(this.data.formId)
      },
      onCustom(e) {
        console.log(e)
        this.onChange(e.detail.value);
        if (e.detail.instanse.onAfterChange) {
          e.detail.instanse.onAfterChange()
        }
      },
      onChange(v) {
        this.setData({
          innerValue: v
        })
        let form = this.getFormRef();
        form.setModelByPath(this.data.prop,  v)
      },
      bindInput(e) {
        // console.log('bindInput', e)
        this.onChange(e.detail.value)
      },
      bindInputNumber(e) {
        let v = parseFloat(e.detail.value)
        if (Number.isNaN(v)) {
          v =  null
        }
        this.onChange(v)
      },
      bindChange(e) {
        // console.log('bindChange', e)
        this.onChange(e.detail.value)
      },
      bindPickerChange(e) {
        let index = parseFloat(e.detail.value);
        console.log('bindChange', index)
        this.setData({
          optionCurrent: this.data.options[index]
        })
      }
    }
  })
}