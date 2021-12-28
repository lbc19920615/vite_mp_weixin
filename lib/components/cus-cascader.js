// lib/components/cus-addess.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    maxLevel: {
      type: Number,
      value: 2
    },
    placeholder: {
      type: String,
      value: '请选择'
    },
    options: null
  },

  /**
   * 组件的初始数据
   */
  data: {
    visible: false,
    inner_options: [],
  },

  lifetimes: {
    ready() {
      this.setOptions()
    }
  },

  methods: {
    setOptions() {
      let opt = this.data.options
      if (typeof opt === 'string') {
        opt = globalThis.ZY.JSON5.parse(opt)
      }
      // console.log(opt)
      this.setData({
        inner_options: opt
      })
    },
    onChange(e) {
      // const { picker, value, index } = e.detail;
      this.setData({ value: e.detail.value, 
        title: e.detail.done && e.detail.options.map((n) => n.label).join('/') })
    },
    onOpen() {
      this.setData({
        visible: true
      })
    },
    onClose() {
      this.setData({ visible: false })
    },
  }
})
