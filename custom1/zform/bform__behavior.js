import { getGlobal } from './utils'

let global = getGlobal();
let forms = new Map();
let ZY = global.ZY;

module.exports = Behavior({
  data: {
  },
  methods: {
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