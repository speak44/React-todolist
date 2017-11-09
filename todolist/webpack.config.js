const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const CleanFolder=require('clean-webpack-plugin');
const rv = (...a)=>path.resolve(__dirname,...a);
module.exports={
  entry:'./src/app.js',
  output:{
    path:rv('dist'),
    filename:'app.js'
  },
  devtool:'eval-source-map',
  module:{
    rules:[
      {
        test:/\.js$/,
        use:['babel-loader'],
        exclude:[rv('node_modules')]
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      },
      {
        test:/\.(jpg|png|jpeg|gif)$/,
        use:['file-loader']
      }
    ]
  },
  plugins: [
      new HtmlWebpackPlugin({
          filename: 'index.html',
          template: './src/index.html'
      }),
      new CleanFolder(['dist'])
  ]
}
