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
    binds: {
      type: Object
    },
    name: {
      type: String
    },
    formId: {
      type: String
    }
  },

  data: {
  },

  methods: {
  },
  lifetimes: {
    ready() {
      // console.log(this.getForm(this.data.formId));
      // console.log('slot ready')
    }
  }
})
