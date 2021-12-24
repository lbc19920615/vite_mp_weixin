import {global} from '/zform-common/globals';
// import axios from 'axios-miniprogram';
import  eval5 from 'eval5';
// global.eval5 = eval5
global.ZY_EXT = {
  eval5
};

import env, {envVersion} from './env.js';

console.log(env, envVersion)
import {initRequestLib, context} from './zform-common/request/index';
let { request }  = initRequestLib({
  ajaxConfig: {
    baseURL: env.MP_AXIOS_URL
  }
});
context.Message = function({ message = '',
  type = 'error',
  duration = 5 * 1000} = {}) {
  wx.showToast({
    icon: type,
    title: message,
    duration,
  })
}
global.Req = request

let themeVars =  {
  '--el-color-white': '#ffffff',
  '--el-color-black': '#000000',
  '--el-color-primary': '#409eff',
  '--el-color-primary-light-1': '#53a8ff',
  '--el-color-primary-light-2': '#66b1ff',
  '--el-color-primary-light-3': '#79bbff',
  '--el-color-primary-light-4': '#8cc5ff',
  '--el-color-primary-light-5': '#a0cfff',
  '--el-color-primary-light-6': '#b3d8ff',
  '--el-color-primary-light-7': '#c6e2ff',
  '--el-color-primary-light-8': '#d9ecff',
  '--el-color-primary-light-9': '#ecf5ff',
  '--el-color-success': '#67c23a',
  '--el-color-success-light': '#e1f3d8',
  '--el-color-success-lighter': '#f0f9eb',
  '--el-color-warning': '#e6a23c',
  '--el-color-warning-light': '#faecd8',
  '--el-color-warning-lighter': '#fdf6ec',
  '--el-color-danger': '#f56c6c',
  '--el-color-danger-light': '#fde2e2',
  '--el-color-danger-lighter': '#fef0f0',
  '--el-color-error': '#f56c6c',
  '--el-color-error-light': '#fde2e2',
  '--el-color-error-lighter': '#fef0f0',
  '--el-color-info': '#909399',
  '--el-color-info-light': '#e9e9eb',
  '--el-color-info-lighter': '#f4f4f5',
  '--el-bg-color-base': '#f5f7fa',
}
App({
  globalData: {
    themeVars: {
      ...themeVars,
      ['--zform-slider-active-color']: themeVars['--el-color-primary'],
      ['--zform-rate-color']: '#ffd21e'
    }
  },
  onLaunch: function () {

  }
})
