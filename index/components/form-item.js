import { behavior as computedBehavior } from 'miniprogram-computed'
import bform__behavior from './bform__behavior'
Component({
  behaviors: [bform__behavior, computedBehavior],
  relations: {
    './bform__behavior': {
      type: 'ancestor', // 关联的目标节点应为祖先节点
    }
  },
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
