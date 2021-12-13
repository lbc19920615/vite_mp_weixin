import { getGlobal } from './utils'

let global = getGlobal();
let forms = new Map();
let ZY = global.ZY;
let formMetas = new Map();

function getOrInitFormMeta(id, v) {
  if (!formMetas.has(id)) {
    formMetas.set(id, {})
  }
  return formMetas.get(id)
}

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
    zform__setMeta(formId, path, value) {
      let meta = getOrInitFormMeta(formId);
      ZY.lodash.set(meta, path, value);
      // console.log(formMetas)
    },
    zform__gettMeta(formId, path) {
      let meta = getOrInitFormMeta(formId);
      return  ZY.lodash.get(meta, path)
    },
    registerForm(key, ctx) {
      forms.set(key, ctx);
    },
    getForm(key) {
      return forms.get(key)
    },
  }
})