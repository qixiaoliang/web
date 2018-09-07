const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const CleanPlugin = require( 'clean-webpack-plugin' );
const ForkTSPlugin = require( 'fork-ts-checker-webpack-plugin' );
const path = require( 'path' );
const webpack = require( 'webpack' );
const context = path.resolve( __dirname, '../' );

module.exports = {
	context: context,
	entry: {
		'main': './ts/main.tsx'
	},
	output: {
		path: path.join( __dirname, '../dist/' ),
		filename: 'js/[name]-[hash:8].js',
		sourceMapFilename: 'js/[name].map.js',
		chunkFilename: 'js/[name]-[hash:8].js',
		publicPath: '/'
	},
	resolve: {
		extensions: [
			'.ts', '.tsx', '.js'
		],
		alias: {
			'@src': path.resolve( __dirname, '../src' ),
			'@css': path.resolve( __dirname, '../css' )
		}
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				options: {
					transpileOnly: true
				},
				exclude: /node_modules/,
			},
			/* {
				test: /\.js$/,
				loader: 'babel-loader',
				options: {
					preset: [ 'env' ]
				},
				exclude: /node_modules/
			}, */
			{
				test: /\.(jpe?g|png|gif|svg|ico|mp3|svg|eot|ttf|woff)$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'src/[name]-[hash:8].[ext]'
				}
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract( {
					use: [
						'css-loader', {
							loader: 'postcss-loader',
							options: {
								config: {
									path: path.resolve( __dirname, './postcss.config.js' )
								}
							}
						}
					],
					fallback: 'style-loader'
				} )
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract( {
					use: [
						'css-loader', {
							loader: 'postcss-loader',
							options: {
								config: {
									path: path.resolve( __dirname, './postcss.config.js' )
								}
							}
						}, {
							loader: 'sass-loader',
							options: {
								indentedSyntax: false
							}
						}
					],
					fallback: 'style-loader'
				} )
			},
			{
				test: /\.txt$/,
				loader: 'raw-loader'
			}
		]
	},
	externals: {
	},
	plugins: [
		new ForkTSPlugin(),
		new CleanPlugin( path.resolve( context, './dist' ) ),
		new HtmlWebpackPlugin( {
			title: 'Comic Strips',
			template: './index.html',
			favicon: './src/favicon.ico'
		} ),
		new ExtractTextPlugin( 'css/[name]-[contenthash:8].css' )
	]
}