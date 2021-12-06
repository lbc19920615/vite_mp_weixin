
export function parseConfigJSON5(fun) {
  // let CONFIG_STR = global.ZY.getHereDoc(fun);
  // console.log(CONFIG_STR)
  let CONFIG_STR = fun;
  return global.ZY.JSON5.parse(CONFIG_STR);
}

export const getGlobal = function() {
	// if (typeof self !== 'undefined') { return self; }
	if (typeof globalThis !== 'undefined') { return globalThis; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('unable to locate global object');
};
