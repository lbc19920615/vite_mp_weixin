import { behavior as computedBehavior } from 'miniprogram-computed'
import bform__behavior from './bform__behavior'

Component({
  behaviors: [bform__behavior, computedBehavior],
  relations: {
    'bform__behavior': {
      type: 'descendant', // 关联的目标节点应为子孙节点
      target: bform__behavior
    }
  },
  properties: {
  },
  data: {
    uuid: 'form__' + global.ZY.rid(10),
    list: [
      {
        id: 1
      },
      {
        id: 2
      },
      {
        id: 3
      },
    ],
    model_str: '',
    model: {}
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
      console.log('form created')
    },
    ready() {
      this.test1()
    }
  },

  methods: {
    setModelByPath(path, val) {
      let s_path = 'model.' + path
      this.setData({
        // ['model_str']: Date.now(),
        [s_path]: val
      })
    }
  },
  
})
