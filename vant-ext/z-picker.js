// vant-ext/z-picker.js
Component({
  options: {
    styleIsolation:'apply-shared'
  },
  properties: {
    defaultIndex: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show: false,
    pickerIndex: 0,
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
    cachedIndex: -1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onAfterChange() {
      this.setData({
        show: false
      })
    },
    onClose(e) {
      console.log(e)
    },
    bindPickerChange(e) {
      let index = parseFloat(e.detail.value);
      // console.log('bindChange', index)
      this.setData({
        cachedIndex: index
      })
    },
    showPopup() {
      this.setData({
        cachedIndex: this.data.defaultIndex,
        show: true,
      })
    },
    cancel() {
      this.setData({
        show: false
      })
    },
    confirm() {
      let option = this.data.options[this.data.cachedIndex]
      this.triggerEvent('confirm', {
        instanse: this,
        value: option.value,
        option
      })
    }
  }
})
