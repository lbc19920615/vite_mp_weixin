import { behavior as computedBehavior } from 'miniprogram-computed'
import bform__behavior from './bform__behavior'
import {getGlobal} from './utils'
let global = getGlobal();

export function createFormComponent({
  formDef
} = {}) {
  let ZY = global.ZY;
  // console.log(ZY);
  let lastErrors = [];
  function delFindError(errorField) {
    if (!lastErrors) {
      lastErrors = []
    }
    let index = lastErrors.findIndex(lastError => {
      return lastError.field === errorField
    });
    if (index > - 1) {
      lastErrors.splice(index, 1)
    }
  }
  Component({
    behaviors: [bform__behavior, computedBehavior],
    options: {
      styleIsolation: 'shared'
    },
    relations: {
      'bform__behavior': {
        type: 'descendant', // 关联的目标节点应为子孙节点
        target: bform__behavior
      }
    },
    properties: {
    },
    data: {
      formName: formDef.name,
      uuid: 'zform__' + global.ZY.rid(10),
      model_str: '',
      model: {},
      formConfig: {},
      formUIConfig: {}
    },
    watch: {
      model_str: function(newVal) {
        console.log('model_str', newVal)
      },
      ['model.**']: function(newVal) {
        console.log('model', newVal)
      }
    },
    lifetimes: {
      created() {
        this.registerForm(this.data.uuid, this);
        let formUIConfig = formDef?.def?.ui ?? {}
        this.setData({
          formConfig: formDef?.def,
          formUIConfig: formUIConfig,
          formWidgetConfig: Object.fromEntries(formUIConfig.attrs)
        })
        // console.log('form created', this.data)
        this.zform__setMeta(this.data.uuid, 'descriptor', {
          field__znE17X3L4G: {
            type: 'string',
            required: true,
          }
        })
      },
      ready() {
        // this.test1()
      }
    },
  
    methods: {
      zformi_formWidgetConfig() {
        return this.data.formWidgetConfig
      },
      getFormConfig() {
        return formDef
      },
      setModelByPath(path, val) {
        let s_path = 'model.' + path
        this.setData({
          // ['model_str']: Date.now(),
          [s_path]: val
        })
      },
      zform___handleEvent(e) {
        // console.log(e);
        let {eventName} = e.dataset;
        // console.log(eventName);
        // this.validate();
        this.triggerEvent(eventName, {
          ...e,
          form: this
        })
      },
      findField(fields, fieldPath) {
        return fields.find(field => {
          return field.data.fieldPath === fieldPath
        })
      },
      getDescriptor() {
        let descriptor = this.zform__gettMeta(this.data.uuid, 'descriptor');
        return descriptor
      },
      getValidator(descriptor) {
        let Schema = global.ZY.Schema;
        return new Schema(descriptor);
      },
      // 参考elemennt form https://element-plus.gitee.io/zh-CN/component/form.html#form-%E6%96%B9%E6%B3%95
      /**
       * 
       * @param cb Function(callback: Function(boolean, object))
       */
      validate(cb) {
        let self = this;
        
        let fieldEles = self.selectAllComponents('.z-form__field');
        let descriptor = self.getDescriptor();
        // console.log(descriptor)
        const validator = self.getValidator(descriptor);
    
        validator.validate(self.data.model, (errors, fields) => {
          // console.log(errors, fields);
          let isValid = !errors;
          console.log(isValid)
          ZY.lodash.each(errors, function(error)  {
            delFindError(error.field);
            self.findField(fieldEles, error.field)?.setErrState()
            console.log( self.findField(fieldEles, error.field))
          })
          // // console.log(lastErrors);
          /**
           * 之前犯的错误 这次不存在 就要收回
           */
          ZY.lodash.each(lastErrors, function(error)  {
            self.findField(fieldEles, error.field)?.clearErrState()
          });
          lastErrors = errors;
          cb(isValid, errors);
        });
      },
      /**
       * validateField
       * @param {string | string[]} fieldPath 
       */
      validateField(fieldPath) {
        let self = this;
        let fieldEles = self.selectAllComponents('.z-form__field');
        let descriptor = self.getDescriptor();
        let desc = ZY.lodash.get(descriptor, fieldPath)
        const validator = self.getValidator({
          [fieldPath]: desc
        });
        let model = {
          [fieldPath]:  ZY.lodash.get(this.data.model, fieldPath)
        }
        // console.log(model)
        validator.validate(model, (errors, fields) => {
          let isValid = !errors;
          let f = self.findField(fieldEles, fieldPath);
          if (isValid) {
            delFindError(fieldPath);
        
            // console.log(f);
            // console.log(error)
            f?.clearErrState()
          } else {
            f?.setErrState()
          }
      
        })
      },
      /**
       * clearValidate
       * @param {*} props 
       */
      clearValidate(props) {
        let self = this;
        let fieldEles = self.selectAllComponents('.z-form__field');
        if (Array.isArray(props)) {
          fieldEles = fieldEles.filter(v => {
            return props.includes(v.data.fieldPath)
          })
        }
        ZY.lodash.each(fieldEles, function(fieldEle)  {
          fieldEle.clearErrState();
          delFindError(fieldEle.fieldPath)
        });

      }
    },
    
  })
  
}