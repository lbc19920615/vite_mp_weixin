/**
 * initChinaAreaManagerFromObj
 * @param obj
 */
function initChinaAreaManagerFromObj(obj= {}) {
    // let obj = {}
    let manager = {}
    // try {
    //     obj = ZY.JSON5.parse(str)
    // } catch (e) {
    //     console.log(e)
    // }
    manager.obj = obj
    manager.get = function (path, defaultVal) {
        return ZY.lodash.get(obj, path, defaultVal)
    }
    return manager
}


export function install(global) {
    import('./area.js').then(res => {
        // console.log(res)
        global.chinaAreaManager =
          initChinaAreaManagerFromObj(res);
    });
}
