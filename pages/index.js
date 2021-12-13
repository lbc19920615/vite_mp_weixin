Page({
  onReady() {
    // console.log('all forms', this.selectAllComponents('.cus-form'))
  },
  onSubmitForm(e) {
    let { form } = e.detail;
    form.validate((isValid, errors) => {
      console.log(isValid, errors)
    });
  },
  onSubmitScroll(e) {
    let { form } = e.detail;
    // console.log(form.zform__getFieldEles())
    let eles = form.zform__getFieldEles();

    form.scrollToField(eles[2].data.fieldPath)
  }
})