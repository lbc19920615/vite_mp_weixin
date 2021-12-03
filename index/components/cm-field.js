import { behavior as computedBehavior } from 'miniprogram-computed'
import bform__behavior from './bform__behavior'

Component({
  behaviors: [bform__behavior, computedBehavior],
  relations: {
    './bform__behavior': {
      type: 'ancestor', // 关联的目标节点应为祖先节点
    }
  },
  properties: {
    formId: {
      type: String
    },
    prop: {
      type: String,
    }
  },
  data: {
    options: [
      {
        label: '1',
        value: '1'
      },
      {
        label: '2',
        value: '2'
      }
    ],
    direction: 'left',
    pickerIndex: 0
  },
  methods: {
    getFormRef() {
      return this.getForm(this.data.formId)
    },
    onChange(v) {
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
      let index = parseFloat(e.detail.value)
      this.setData({
        pickerIndex: index
      })
      console.log('sdsdsds', index)
    }
  }
})
