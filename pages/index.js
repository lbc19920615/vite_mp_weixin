Page({
  onReady() {
    // console.log('all forms', this.selectAllComponents('.cus-form'))
  },
  onSubmitForm(e) {
    let { form } = e.detail;
    form.scrollToField('field__TSjNqnDLCQ')
    // form.validate((isValid, errors) => {
    //   console.log(isValid, errors)
    // });
  }
})