
const envVersion = wx.getAccountInfoSync().miniProgram.envVersion;

const config = {
  develop: {
    MP_AXIOS_URL: 'http://192.168.1.57:15001'
  }
}

export {config, envVersion}
export default config[envVersion]