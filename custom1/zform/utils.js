
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

export function flattenObject(ob) {
  var toReturn = {};

  for (var i in ob) {
    // eslint-disable-next-line no-prototype-builtins
    if (!ob.hasOwnProperty(i)) continue;

    if ((typeof ob[i]) == 'object' && ob[i] !== null) {
      var flatObject = flattenObject(ob[i]);
      for (var x in flatObject) {
        // eslint-disable-next-line no-prototype-builtins
        if (!flatObject.hasOwnProperty(x)) continue;

        toReturn[i + '.' + x] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
}

export function findArrIsAllInArr(target, container) {
  let isAllHas = false;
  isAllHas = target.every(item => {
    return container.includes(item)
  });
  return isAllHas
}