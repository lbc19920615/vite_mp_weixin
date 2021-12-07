import { behavior as computedBehavior } from 'miniprogram-computed'
import com_behavvior from './behavior'

Component({
  options: {
    styleIsolation:'apply-shared'
  },
  behaviors: [com_behavvior, computedBehavior],
  properties: {
    htmlContent: {
      type: String
    }
  },
  data: {
    html: ''
  },
  lifetimes: {
    ready() {
      // console.log(this.data.htmlContent)
      this.setHtml();
    }
  },
  methods: {
    setHtml() {
      let ZY = this.ext_ZY();
      try {
        let obj = ZY.JSON5.parse(this.data.htmlContent);
        // console.log(obj);
        this.setData({
          html: obj.html
        })
      } catch(e) {
        console.log(e)
      }
    }
  }
})