export default {
  'entry':'./src/index.js',
  "disableCSSModules": true,
  "hash": false,
  "env":{
    "development": {
      "extraBabelPlugins": [
        "dva-hmr",
        ["import", { "libraryName": "antd", "style": "css" }],
      ]
    }
  }
}