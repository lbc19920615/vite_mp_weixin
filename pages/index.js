Page({
  data: {
    height: 0
  },
  onLoad() {
    // console.log('all forms', this.selectAllComponents('.cus-form'))
    let data = wx.getSystemInfoSync();
    let height = data.windowHeight * .9; 
    this.setData({
      height
    })
  },
  onSubmitForm(e) {
    let { form } = e.detail;
    form.validate((isValid, errors) => {
      // console.log(isValid, errors, form.getModel())
      let model = form.getModel()
    });
  },
  onSubmitScroll(e) {
    let { form } = e.detail;
    // console.log(form.zform__getFieldEles())
    let eles = form.zform__getFieldEles();

    form.scrollToField(eles[2].data.fieldPath)
  }
})