import koa = require( 'koa' );
const app = new koa();
import * as http from "http";

import ENV from './env';
import './env';
import router from './routes/api-route';
import log from './middlewares/log';
import staticServer from './routes/file-server';
import emailVerityRouter from './routes/email-verify-router';
import Gzip from './middlewares/gzip'

declare global {
	namespace NodeJS {
		interface Global {
			env: ENV;
		}
	}
	interface Object {
		values: ( obj: object ) => string[];
	}
}

app.use( log );

app.use( async ( ctx, next ) => {
	ctx.set( 'Access-Control-Allow-Origin', '*' );
	try {
		await next();
		if ( typeof ctx.body === 'string' ) {
			ctx.body = JSON.stringify( ctx.body );
		}
	}
	catch ( e ) {
		ctx.status = e.status || 400;
		ctx.body = { error: e.message || 'ERROR' };
		ctx.log.error( { e } );
	}
} )

app.use( Gzip );

app.use( staticServer );
app.use( router.routes() );
app.use( router.allowedMethods() );
app.use( emailVerityRouter.routes() );
app.use( emailVerityRouter.allowedMethods() );

const { port, host } = global.env.net;
let server = http.createServer( app.callback() );
server.listen( port, host );

process.on( 'uncaughtException', ( err ) => {
	console.log( err );
} )

