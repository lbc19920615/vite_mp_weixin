import { getGlobal } from './utils'

let global = getGlobal();
let forms = new Map();
let ZY = global.ZY;

module.exports = Behavior({
  data: {
    APP_DATA: {}
  },
  lifetimes: {
    ready() {
      this.setData({
        APP_DATA: this.zform__getGlobalData([])
      })
    }
  },
  methods: {
    zform__getGlobalData(pathArr = []) {
      let s_path =  ZY.getObjPathFromPathArr(pathArr)
      let _d =  getApp().globalData;
      // console.log(_d, s_path)
      return ZY.deepGet(_d, s_path)
    },
    zform__getObjPathFromPathArr(pathArr) {
      return ZY.getObjPathFromPathArr(pathArr)
    },
    zform__getFieldConfig(formId, configPath) {
      let form = forms.get(formId)
      let config = form.getFormConfig()
      return ZY.deepGet(config, configPath)
    },
    registerForm(key, ctx) {
      forms.set(key, ctx);
    },
    getForm(key) {
      return forms.get(key)
    },
  }
})