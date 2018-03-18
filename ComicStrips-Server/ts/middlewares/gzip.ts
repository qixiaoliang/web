import * as zlib from 'zlib';
import * as koa from 'koa';

export default async function ( ctx: koa.Context, next: () => Promise<any> ) {
	await next();
	if (
		( ctx.response.is( 'json' ) ||
			ctx.response.is( 'text' ) ||
			ctx.response.is( 'html' ) ||
			typeof ctx.body === 'string' ) &&
		ctx.response.length > 1000
	) {
		if ( ctx.response.is( 'json' ) ) {
			ctx.body = await gzip(
				Buffer.from( JSON.stringify( ctx.body ), 'utf8' )
			)
			ctx.set( 'Content-encoding', 'gzip' );
		}
		else if ( typeof ctx.body === 'string' ) {
			ctx.body = await gzip(
				Buffer.from( ctx.body, 'utf8' )
			)
			ctx.set( 'Content-encoding', 'gzip' );
		}
		else if ( Buffer.isBuffer( ctx.body ) ) {
			ctx.body = await gzip(
				ctx.body
			)
			ctx.set( 'Content-encoding', 'gzip' );
		}
		ctx.set( 'Content-encoding', 'gzip' );
	}
}

function gzip( buf: Buffer ) {
	return new Promise( ( resolve, reject ) => {
		let gz = zlib.gzip( buf, ( err, result ) => {
			if ( err ) reject( err )
			else resolve( result )
		} )
	} )
}