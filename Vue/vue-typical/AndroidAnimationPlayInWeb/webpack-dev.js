let webpack = require( 'webpack' );
let path = require( 'path' );
let HtmlWebpackPlugin = require( 'html-webpack-plugin');

module.exports = {
	entry: [
		'babel-polyfill',
		'./main.js'
	],
	output: {
		path: path.join( __dirname, 'dist/' ),
		filename: 'main.js'
	},
	devtool: 'inline-source-map',
	devServer: {
		hot: true
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				options: {
					presets: ['es2015']
				}
			},
			{
				test: /(\.jpg|\.png)$/,
				loader: 'file-loader',
				include: /src/
			},
			{
				test: /\.txt$/,
				loader: 'raw-loader',
				include: /src/
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin( {
			title: 'AndroidAnimationPlayInWeb',
			template:'./dist/template.html'
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedChunksPlugin()
	]
}