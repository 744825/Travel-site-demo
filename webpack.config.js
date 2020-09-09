const currentTask = process.env.npm_lifecycle_event

const path = require('path')
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpPackPlugin = require("html-webpack-plugin")
const fse = require("fs-extra")

const postCSSPlugins = [
  require("postcss-import"),
  require("postcss-mixins"),
  require("postcss-simple-vars"),
  require("postcss-nested"),
  require("postcss-hexrgba"),
  require("autoprefixer")
]


class RunAfterComplie{
  apply(complier){
    complier.hooks.done.tap("Copy images", function(){
      fse.copySync("./app/assets/images", "./docs/assets/images")
    })
  }
}

let cssConfig = {
  test: /\.css$/i,
  use: [ 'css-loader?url=false', {loader: "postcss-loader", options:{plugins:postCSSPlugins}}  ]//css-loader
}

let pages = fse.readdirSync("./app").filter((file)=>{
 return file.endsWith(".html")
}).map((page)=>{
  return new HtmlWebpPackPlugin({
    filename : page,
    template : `./app/${page}`
  })
})

let config = {
  entry: './app/assets/scripts/App.js',
  plugins : pages, //for one page[new HtmlWebpPackPlugin({filename:"index.html", template:"./app/index.html"})],
  module:{
    rules:[
      cssConfig
    ]
  }
}

if (currentTask == "dev"){

  cssConfig.use.unshift("style-loader")
  config.output = {
    filename: 'bundled.js',
    path: path.resolve(__dirname, 'app')
  }
config.devServer = {
  before: function(app ,server){
    server._watch("./app/**/*.html")
  },
  contentBase: path.join(__dirname, 'app'),
  hot: true,
  port :3000,
  host: '0.0.0.0'
}
config.mode = "development"

}

if (currentTask == "build"){

  config.module.rules.push({
    test:/\.js$/,
    exclude : /(node_modules)/,
    use :{
      loader : "babel-loader",
      options :{
        presets : ["@babel/preset-env"]
      }
    }

  })

  cssConfig.use.unshift(MiniCssExtractPlugin.loader)
  postCSSPlugins.push(require("cssnano"))
config.output ={
  filename: '[name].[chunkhash].js',
  chunkFilename : "[name].[chunkhash].js",
  path: path.resolve(__dirname, 'docs')
}
config.mode = "production"
config.optimization ={
  splitChunks :{chunks: "all"}
}
 config.plugins.push(
   new CleanWebpackPlugin(), 
   new MiniCssExtractPlugin({filename:"styles.[chunkhash].css"}),
   new RunAfterComplie()
   )
}


let deleteMelater = {
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

module.exports= config;