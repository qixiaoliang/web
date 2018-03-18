import * as ejs from 'ejs';

export function ejsRender( _path: string, data: object ): Promise<string> {
	return new Promise( ( resolve, reject ) => {
		ejs.renderFile( _path, data, ( err, html ) => {
			if ( err ) reject( err );
			else resolve( html )
		} )
	} )
}

export type TakeDataType = {
	token: string;
	[ key: string ]: any;
}

export class TakeInTime {
	private static datas: TakeDataType[] = [];

	static addData( data: TakeDataType, ms: number ) {
		let index = TakeInTime.datas.findIndex( item => data.token === item.token );
		if ( index >= 0 ) {
			TakeInTime.datas.splice( index, 1 );
		}
		let length = TakeInTime.datas.push( data );
		setTimeout( () => {
			TakeInTime.datas.splice( length - 1, 1 );
		}, ms );
	}

	static getItem( token: string ) {
		let index = TakeInTime.datas.findIndex( item => token === item.token );
		if ( index >= 0 ) {
			let { token, ...data } = TakeInTime.datas.splice( index, 1 )[ 0 ];
			return data;
		}
		return null;
	}
}
