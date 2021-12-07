export const getGlobal = function() {
	// if (typeof self !== 'undefined') { return self; }
	if (typeof globalThis !== 'undefined') { return globalThis; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('unable to locate global object');
};
let global = getGlobal();
let ZY = global.ZY;

module.exports = Behavior({
  data: {
  
  },
  methods: {
    ext_ZY() {
      return ZY;
    },
    /**
     * 改变数组值
     * @param {*} index 
     * @param {*} value 
     */
    ext__changeArrData(index, value) {
      console.log('changeArrData')
    }
  }
})