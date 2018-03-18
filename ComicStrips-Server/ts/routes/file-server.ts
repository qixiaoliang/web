import staticServer = require( 'koa-static-cache' );
import * as path from 'path';
import * as koa from 'koa';

let dir = path.join( process.cwd(), './src/' );

export default staticServer( dir, {
	maxAge: 3600 * 1000 * 24 * 365,
	buffer: true,
	gzip: true,
	usePrecompiledGzip: true,
	dynamic: true,
	prefix: '/src'
} )
