// index/components/form.js
import bform__behavior from './bform__behavior'



Component({
  behaviors: [
    bform__behavior
  ],
  relations: {
    'bform__behavior': {
      type: 'descendant', // 关联的目标节点应为子孙节点
      target: bform__behavior
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    uuid: '11111',
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
    ]
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
  },
  
})
