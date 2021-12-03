let forms = new Map();

module.exports = Behavior({
  data: {
  
  },
  methods: {
    registerForm(key, ctx) {
      forms.set(key, ctx);
    },
    getForm(key) {
      return forms.get(key)
    },
    test1() {
      console.log('test1')
    }
  }
})