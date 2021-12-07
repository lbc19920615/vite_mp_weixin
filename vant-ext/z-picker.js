import { behavior as computedBehavior } from 'miniprogram-computed'
import com_behavvior from './behavior'

Component({
  options: {
    styleIsolation:'apply-shared'
  },
  behaviors: [com_behavvior, computedBehavior],
  properties: {
    defaultIndex: {
      type: Array,
      value: [0]
    },
    options: {
      type: Array,
      value: []
    },
    value: null
  },


  data: {
    show: false,
    pickerIndex: [-1],
    cachedIndex: [-1],
    showCom: false
  },
  
  lifetimes: {
    created() {
      // console.log(this.ext__changeArrData)
      this.setData({
        pickerIndex: this.data.defaultIndex
      })
    }
  },

  watch: {
    value(newVal) {
      console.log('newval', newVal, this.findIndex(newVal))
      // this.setData({
      //   pickerIndex:  this.findIndex(newVal)
      // })
    }
  },

  methods: {
    findIndex(value, column = 0) {
      return this.data.options[column].findIndex((option) => {
        return option.value === value
      })
    },
    onAfterChange() {
      this.setData({
        show: false
      })
    },
    onClose(e) {
      console.log(e)
    },
    bindPickerChange(e) {
      // let index = parseFloat(e.detail.value);
      console.log('bindChange', e)
      this.setData({
        cachedIndex: e.detail.value
      })
    },
    showPopup() {
      this.setData({
        cachedIndex: this.data.pickerIndex,
        show: true,
      })
      setTimeout(() => {
        this.setData({
          showCom: true
        })
      }, 100)
    },
    cancel() {
      this.setData({
        showCom: false,
        show: false,
      })
    },
    confirm() {
      // console.log(this.data.cachedIndex)
      let cachedArr = this.data.cachedIndex
      let optionArr = this.data.options.map((optionColumn, columnIndex) => {
        return optionColumn[cachedArr[columnIndex]]
      })
      let valueArr =optionArr.map(option => option.value)
      // console.log(option)
      this.triggerEvent('confirm', {
        instanse: this,
        value: valueArr,
        option: optionArr
      })
    }
  }
})
