import * as ejs from "ejs";
import { join } from "path";
import * as querystring from "querystring";
import * as crypto from "crypto";

import Email from './email';
import { User } from './user'
import { TakeInTime, TakeDataType, ejsRender } from './util';

export type UserInfo = {
	email: string;
	type: 'register' | 'changePassword';
	[ key: string ]: any;
}

export class EmailVerify {
	static waitPool: UserInfo[] = [];

	static async response( userInfo: UserInfo ) {
		const { email, type } = userInfo;

		let hmac = crypto.createHmac( 'sha256', global.env.secrets.hmac + Date.now() );
		hmac.update( email + type );
		const key = hmac.digest( 'hex' );

		const { outerAddress } = global.env.net;
		const query = { key, type }

		let config = {
			register: {
				path: join( process.cwd(), './template/email-temp-register.ejs' ),
				data: {
					user: email,
					link: `${ outerAddress }/EmailVerify?${ querystring.stringify( query ) }`
				}
			},
			changePassword: {
				path: join( process.cwd(), './template/email-temp-changePassword.ejs' ),
				data: {
					name: userInfo.name,
					link: `${ outerAddress }/EmailVerify?${ querystring.stringify( query ) }`
				}
			}
		}

		let html = await ejsRender( config[ type ].path, config[ type ].data );
		let result = await Email.send( email, type, html );
		if ( result )
			TakeInTime.addData( { token: key, ...userInfo }, 3600 * 500 );
	}

	static async verify( token: string ) {
		return TakeInTime.getItem( token );
	}
}
