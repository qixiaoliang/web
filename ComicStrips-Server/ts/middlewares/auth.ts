import * as koa from 'koa';

import { User } from '../model/user'

export default async function ( ctx: koa.Context, next: () => Promise<any> ) {
	let { name, password, timeStamp } = ctx.query;
	let verified = await User.verifyUser( name, password, timeStamp );
	if ( verified )
		await next();
	else {
		ctx.throw( 401, 'unauthorization' );
	}
}