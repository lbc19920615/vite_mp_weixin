import { behavior as computedBehavior } from 'miniprogram-computed'
import bform__behavior from './bform__behavior'

export function createSlotComponent() {
  var createEvent = function() {
    return function(e, instanse) {
      console.log(e)
    }
  }
  
  Component({
    behaviors: [bform__behavior, computedBehavior],
    relations: {
      'bform__behavior': {
        type: 'ancestor', // 关联的目标节点应为祖先节点
      }
    },
    properties: {
      binds: {
        type: Object
      },
      name: {
        type: String
      },
      formId: {
        type: String
      },
      pathArr: {
        type: Array
      },
      configPath: {
        type: String
      },
    },

    data: {
      inited: false,
      config: {},
    },
    lifetimes: {
      ready() {
        let _config = this.zform__getFieldConfig(this.data.formId,  this.data.configPath);
        this.setData({
          config: _config,
          inited: true
        })
        // console.log(this.getForm(this.data.formId));
        // console.log('slot ready', _config)
      }
    },
    methods: {
      getFormRef() {
        return this.getForm(this.data.formId)
      },
      callEvent: function(e) {
        // console.log(e)
        this.getFormRef().zform___handleEvent({
          type: e.type,
          detail: e.detail,
          dataset: e.target.dataset,
          origin: e,
          ctx: this
        })
      }
    },
    
  })
}