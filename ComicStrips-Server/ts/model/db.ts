//@ts-ignore
import * as sql from 'mysql2/promise';
import * as fs from 'fs';
import * as path from 'path';

export type DBDataResult = {
	[ key: string ]: any;
}[];

export type DBInfoResult = {
	affectedRows: number;
	affectedChanges: number;
}

export class DB {
	static pool: any = null;
	static async getPool() {
		const { user, host, port, passwordSha1 } = global.env.db;

		if ( !DB.pool ) {
			DB.pool = await sql.createPool( {
				user, host, port,
				database: 'comisstrips_test',
				passwordSha1: Buffer.from( passwordSha1, 'base64' )
			} )
		}
	}

	static async queryNoData( query: string, data: any[] = [] ): Promise<DBInfoResult> {
		await DB.getPool();
		const conn = await DB.pool.getConnection();
		const result: [ DBInfoResult ] = await conn.query( query, data );
		conn.release();
		return {
			affectedChanges: result[ 0 ].affectedChanges,
			affectedRows: result[ 0 ].affectedRows
		}
	}

	static async query( query: string, data: any[] = [] ): Promise<DBDataResult> {
		await DB.getPool();
		const conn = await DB.pool.getConnection();
		const result = await conn.query( query, data );
		conn.release();
		return result && result[ 0 ];
	}
	static keyToLowerCase( obj: any ): object {
		if ( Array.isArray( obj ) )
			return obj.map( val => DB.keyToLowerCase( val ) );
		let lowerCaseObj: any = {};
		for ( let k in obj ) {
			lowerCaseObj[ k.toLowerCase() ] = obj[ k ];
		}
		return lowerCaseObj;
	}
	static async getConn() {
		await DB.getPool();
		const conn = await DB.pool.createConnection();
		return conn;
	}
}
