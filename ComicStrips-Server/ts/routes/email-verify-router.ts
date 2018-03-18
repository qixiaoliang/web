import * as Router from 'koa-router';
import * as Joi from 'joi';
const router = new Router();
import * as path from 'path';

import { EmailVerify } from '../model/emali-verify';
import { User } from '../model/user';
import v = require( 'koa2-validation' );
import { QueryValidation as QV } from 'koa2-validation';
import { ejsRender } from '../model/util';

const registerSchema: QV = {
	query: {
		name: Joi.string().min( 1 )
			.max( 16 ).required(),
		password: Joi.string().token().min( 8 )
			.max( 24 ).required(),
		email: Joi.string().email().required()
	}
}

const verifySchema: QV = {
	query: {
		key: Joi.string().hex().required(),
		type: Joi.string().valid(
			[ 'register', 'changePassword' ]
		).required()
	}
}

router.get( '/registerUser', v( registerSchema ),
	async ( ctx, next ) => {
		ctx.query.type = 'register';
		let { name, email } = ctx.query;
		let hasEmail = await User.hasEmail( email );
		let hasUser = await User.hasUser( name );
		if ( hasEmail || hasUser ) {
			ctx.throw( 400, 'name or email exists' );
		}
		else {
			await EmailVerify.response( ctx.query );
			ctx.body = { status: 'OK' };
		}
	} )

router.get( '/emailVerify', v( verifySchema ),
	async ( ctx, next ) => {
		let { key, type }
			= ctx.query;
		let userInfo = await EmailVerify.verify( key )

		if ( userInfo ) {
			if ( type === 'register' ) {
				let { name, password, email } = userInfo;
				ctx.body = await User.addUser( {
					name, password, email
				} );
				ctx.redirect( '/' );
			}
			if ( type === 'changePassword' ) {
				let { name, newPassword, oldPassword } = userInfo;
				ctx.body = await User
					.changePassword( name, newPassword, oldPassword );
			}
		}
		else {
			ctx.body = await ejsRender(
				path.join( process.cwd(), './template/InvalidVerify.ejs' ), {}
			)
		}
	} )

export default router;