const path = require('path')
const postCSSPlugins = [
  require("postcss-import"),
  require("postcss-mixins"),
  require("postcss-simple-vars"),
  require("postcss-nested"),
  require("postcss-hexrgba"),
  require("autoprefixer")
  
]


module.exports = {
  entry: './app/assets/scripts/App.js',
  output: {
    filename: 'bundled.js',
    path: path.resolve(__dirname, 'app')
  },
  devServer:{
    before: function(app ,server){
      server._watch("./app/**/*.html")
    },
    contentBase: path.join(__dirname, 'app'),
    hot: true,
    port :3000,
    host: '0.0.0.0'
  },
  mode: 'development',
  // watch: true, // only when dev server is not present this watches cvhanges
  module:{
    rules:[
      {
        test: /\.css$/i,
        use: ["style-loader", {loader: "postcss-loader", options:{plugins:postCSSPlugins}}  ]//css-loader
      }
    ]
  }
}