let webpack = require( 'webpack' );
let HtmlWebpackPlugin = require( 'html-webpack-plugin' );
let path = require( 'path' );

module.exports = {
	entry: [
		'babel-polyfill','./main.js'
	],
	output: {
		filename: 'main[hash].js',
		path: path.join( __dirname, 'dist/' )
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
				include:/src/
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
			title: 'Anim',
			template:'./dist/template.html'
		} )
	]
}