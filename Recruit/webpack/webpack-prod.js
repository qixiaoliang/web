let webpack = require( 'webpack' );
let path = require( 'path' );
let base = require( './webpack.base' );
const merge = require( 'webpack-merge' );

const prod = {
	devtool: 'source-map',
	module: {
		rules:[]
	},
	plugins: [
		
	]
}

module.exports = merge( base, prod );