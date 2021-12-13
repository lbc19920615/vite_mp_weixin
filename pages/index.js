Page({
  onReady() {
    // console.log('all forms', this.selectAllComponents('.cus-form'))
  },
  onSubmitForm(e) {
    let { form } = e.detail;
    form.validate((isValid, errors) => {
      console.log(isValid, errors)
    });
  }
})