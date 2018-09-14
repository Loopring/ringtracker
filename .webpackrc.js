export default {
	"extraBabelPlugins": [
    // ["import", { "libraryName": "antd-mobile", "libraryDirectory": "es", "style": true },'antd-mobile'],
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": true },'antd'],
	],
  disableCSSModules: true,
  hash:true,
	"alias":{
    "LoopringJS":`loopring.js/lib`,
    "LoopringUI":`${__dirname}/src/common/loopringui/`,
    "common":`${__dirname}/src/common`,
    "modules":`${__dirname}/src/modules`,
    "ringtracker":`${__dirname}/src/ringtracker`,
	},
  "theme": {
    // "@font-family-no-number"  : "Roboto ,PingFang SC",
    "@font-family"            : "Roboto-Light , Helvetica Neue, Helvetica,sans-serif",
    "@primary-color": "#1c60ff",
    "@link-color": "#1c60ff",
    "@border-radius-base": "0px",
    "@line-height-base" : 1.6,
    "@normal-color" :"#eee",
    "@border-color-base" : "hsv(0, 0, 90%)",
  },
  "html": {
    "template": "./src/ringtracker/public/index.ejs",
    "favicon": './src/assets/images/favicon.ico'
  },
  sass:{},
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'],
    },
  },

}


