// lib/components/cus-addess.js
function loadOptions(code = '86', isLeaf = false) {
  let ret = globalThis.chinaAreaManager.get(code)

  // console.log(ret)
  if (ret) {
    return Object.entries(ret).map(([value, name]) => {
      return {
        label: name,
        value: value,
        isLeaf: isLeaf
      }
    })
  }
  return []
}

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
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    visible: false,
    value: null,
    options: [],
  },

  lifetimes: {
    ready() {
      this.setData({
        options: loadOptions('86')
      })
    }
  },

  methods: {
    onChange(e) {
      // const { picker, value, index } = e.detail;
      this.setData({ 
        value: e.detail.value, 
        title: e.detail.done && e.detail.options.map((n) => n.label).join('/') 
      }, () => {
      })
    },
    onOpen() {
      this.setData({
        visible: true
      })
    },
    onClose() {
      let self = this
      // console.log(self.data)
      this.setData({ visible: false }, () => {
        self.triggerEvent('change', {
          value: self.data.value
        })
      })
  },
    onLoadOptions(e) {
      console.log('onLoadOptions', e.detail)
      const { value } = e.detail
      const options = [...this.data.options]

      wx.showLoading({ mask: true })

      setTimeout(() => {
        let lastCode = value[value.length - 1] 
        let isLeaf = value.length > (this.data.maxLevel - 1)

        let opt = options
        value.forEach(item => {
          opt.forEach((n) => {
              if (n.value === item && n.children) {
                  opt = n.children
              }
          })
        })

        opt.forEach((n) => {
          if (n.value === lastCode) {
            n.children = loadOptions(lastCode, isLeaf)
          }
        })

        // console.log('onLoadOptions', opt, isLeaf)
        wx.hideLoading()

        this.setData({ value: value, options })
      }, 1000)
  },
  }
})
