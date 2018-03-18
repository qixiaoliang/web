let path = require( 'path' );
let webpack = require( 'webpack' );
const context = path.join( __dirname, '../' );

module.exports = {
    context,
    entry: {
        'vendor': [
            'react',
            'react-dom',
            'redux',
            'react-redux',
            'react-router-dom',
            'query-string',
            'jshashes',
            'react-transition-group/Transition',
            'react-transition-group/TransitionGroup',
            'material-ui'
        ]
    },
    output: {
        filename: 'vendor-[hash:8].js',
        path: path.resolve( context, './dist/js/' ),
        library: 'vendor_lib'
    },
    plugins: [
        new webpack.DllPlugin( {
            path: 'dist/manifest.json',
            name: 'vendor_lib',
            context: context,
        } )
    ]
}