import { behavior as computedBehavior } from 'miniprogram-computed'
import bform__behavior from './bform__behavior'
import {getGlobal, flattenObject, findArrIsAllInArr} from './utils'
let global = getGlobal();



export function createFormComponent({
  formDef,
  onCreated
} = {}) {
  let ZY = global.ZY;
  let watchHandleMap = new Map();
  let fieldsMap = new Map();
  // console.log(ZY);
  let lastErrors = [];
  let FIELD_CLS = '.z-form__field';
  let modelLocks = false;
  let lodash = ZY.lodash;
  let JSON5 = ZY.JSON5;
  let cachedModel  = '{}';


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
      formHeight: {
        type: String
      },
      propIdPrefix: {
        type: String,
        value: 'z-form__prop__'
      },
      scrollViewId:{
        type: String,
        value: 'scrollview'
      },
      debug: {
        type: Boolean
      }
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
        // console.log('model', newVal)
        let objKeys = Object.keys(newVal)
        let oldObj = JSON5.parse(cachedModel)
        let diffed = ZY.diff(oldObj, newVal);
        let flattenD = flattenObject(diffed);
        if (!modelLocks) {
          let flattenDKeys = Object.keys(flattenD);
          watchHandleMap.forEach(function (item, key) {
            // console.log(item, key)
            let isContains = lodash.difference(key, objKeys).length < 1;
            let flattenDHas = findArrIsAllInArr(key, flattenDKeys);
            console.log(isContains, flattenDHas, key, flattenDKeys)
            if (isContains && flattenDHas) {
              console.log('changed', key, )
              modelLocks = true
              item.run(newVal);
              setTimeout(() => {
                modelLocks = false
              }, 300)
            }
            // console.log(objKeys, key, isContains)
          })
        }
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
        });
        if (onCreated && onCreated.bind) {
          onCreated.bind(this)()
        }
        // console.log('form created', this.data)
      },
      ready() {
        // this.test1()
      }
    },
  
    methods: {
      getModel() {
        return this.data.model
      },
      zformi__formWidgetConfig() {
        return this.data.formWidgetConfig
      },
      zformi__getFormConfig() {
        return formDef
      },
      zformi__setModelByPath(path, val) {
        let s_path = 'model.' + path
        this.setData({
          // ['model_str']: Date.now(),
          [s_path]: val
        })
        console.log('zformi__setModelByPath', path, val, this.data.model)
      },
      zformi__updateRules(fieldPath, rules) {
        this.zform__setMeta(this.data.uuid, ['descriptor', fieldPath], rules)
      },
      zformi__setPropAndUpdate(path, val) {
        // this.zformi__setModelByPath(path, val);
        let fieldCtx = fieldsMap.get(path);
        // console.log(path, fieldsMap, fieldCtx)
        if (fieldCtx) {
          if (fieldCtx.zfieldi__handleForceUpdate) {
            fieldCtx.zfieldi__handleForceUpdate(val)
          }
        }
      },
      zformi__resgisterField(key, value) {
        fieldsMap.set(key, value)
      },
      zformi___handleEvent(e) {
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
      zform__getFieldEles() {
        return this.selectAllComponents(FIELD_CLS);
      },
      /**
       * 注册监听事件
       */
      zformi__registerWatchHandle(key, value) {
        watchHandleMap.set(key, value)
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
        
        let fieldEles = self.selectAllComponents(FIELD_CLS);
        let descriptor = self.getDescriptor();
        // console.log(descriptor)
        const validator = self.getValidator(descriptor);
    
        validator.validate(self.data.model, (errors, fields) => {
          // console.log(errors, fields);
          let isValid = !errors;
          // console.log(isValid)
          ZY.lodash.each(errors, function(error)  {
            delFindError(error.field);
            self.findField(fieldEles, error.field)?.setErrState()
            // console.log( self.findField(fieldEles, error.field))
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
        let fieldEles = self.selectAllComponents(FIELD_CLS);
        let descriptor = self.getDescriptor();
        let desc = ZY.lodash.get(descriptor, fieldPath);
        if (desc) {
          const validator = self.getValidator({
            [fieldPath]: desc
          });
          let model = {
            [fieldPath]:  ZY.lodash.get(this.data.model, fieldPath)
          }
          // console.log(model);
          // console.log({
          //   [fieldPath]: desc
          // })
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
        }

      },
      /**
       * clearValidate
       * @param {*} props 
       */
      clearValidate(props) {
        let self = this;
        let fieldEles = self.selectAllComponents(FIELD_CLS);
        if (Array.isArray(props)) {
          fieldEles = fieldEles.filter(v => {
            return props.includes(v.data.fieldPath)
          })
        }
        ZY.lodash.each(fieldEles, function(fieldEle)  {
          fieldEle.clearErrState();
          delFindError(fieldEle.fieldPath)
        });
      },
      scrollToField(field) {
        let self = this;
        const query = wx.createSelectorQuery().in(this)
        query.select('#' + this.data.scrollViewId)
        .node()
        .exec((res) => {
          const scrollView = res[0].node;
          // console.log(scrollView)
          scrollView.scrollIntoView('#' + this.data.propIdPrefix + field)
        })
        // query.select('.z-form__field__TSjNqnDLCQ')
        // .boundingClientRect();
        // query.selectViewport().scrollOffset()
        // query.exec(function(res){
        //   // console.log(res)
        //   wx.pageScrollTo({
        //     // scrollTop: res[0].top
        //     selector: '.z-form__field__TSjNqnDLCQ'
        //   })
        // })
    
      }
    },
    
  })
  
}