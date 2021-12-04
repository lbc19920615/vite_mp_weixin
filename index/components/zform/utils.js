
export function parseConfigJSON5(fun) {
  let CONFIG_STR = global.ZY.getHereDoc(fun)
  return global.ZY.JSON5.parse(CONFIG_STR);
}
