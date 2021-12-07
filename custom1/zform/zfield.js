import { behavior as computedBehavior } from 'miniprogram-computed'
import bform__behavior from './bform__behavior'

export function createFieldComponent() {
  Component({
    behaviors: [bform__behavior, computedBehavior],
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
      optionCurrent: {}
    },
    lifetimes: {
      ready() {
        // console.log(this.test1)
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