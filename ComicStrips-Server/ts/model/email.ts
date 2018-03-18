import * as nodemailer from "nodemailer";;

class Email {
	private static get transport () {
		return nodemailer.createTransport( global.env.email )
	}

	static send ( to:string, subject:string, html:string, text = '' ) {
		const option = {
			from: '"zcgzx" <1134495285@qq.com>',
			to, subject, html, text
		};
		return new Promise( ( resolve, reject ) => {
			Email.transport.sendMail( option, ( err, info ) => {
				if ( err ) reject( err );
				else resolve( true );
		} );
	} )
}
}

export default Email;

