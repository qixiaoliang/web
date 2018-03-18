import { DB } from './db';

import * as Joi from 'joi';

class Article {
	ID: number;
	constructor ( articleID: number ) {
		this.ID = articleID;
	}
	async getInfo() {
		let infos = await DB.query(
			'select * from articles where id=? limit 1',
			[ this.ID ]
		);
		return DB.keyToLowerCase( infos[ 0 ] );
	}

	async removeArticle() {
		return await DB.queryNoData(
			'delete from articles where id=? limit 1',
			[ this.ID ]
		);
	}
	async favo( name: string ) {
		return await DB.queryNoData(
			'insert into article_favo (name,article_id) values(?,?)',
			[ name, this.ID ]
		);
	}
	async unFavo( name: string ) {
		return await DB.queryNoData(
			'delete from article_favo where name=? and article_id=? limit 1', [
				name, this.ID
			] )
	}

	async getComments( orderBy = 'id', curID = 1.79e308, limit = 20 ) {
		let comments = await DB.query(
			'select * from article_comment where article_id=? and id<? order by ?? desc limit ?',
			[ this.ID, curID, orderBy, limit ]
		);
		comments.forEach( item => {
			let replys = <string[]> item[ 'REPLYS' ];
			item[ 'REPLYS' ] = replys.map( v => JSON.parse( v ) );
		} )
		return DB.keyToLowerCase( comments );
	}
	static async getArticles( category = '.*', author = '.*', orderBy = 'id', curID = 1.73e308, limit = 20 ) {
		category = category.replace( ',', '|' );

		let articles = await DB.query(
			"select * from articles " +
			"where author regexp ? and category regexp ? and id<? " +
			"order by ?? desc limit ?",
			[ author, category, curID, orderBy, limit ] );

		return DB.keyToLowerCase(
			articles.map( article => {
				article[ 'CONTENT' ] = article[ 'CONTENT' ].toString( 'utf8' );
				return article;
			} ) )
	}
	static async addArticle( articleInfo: object ) {
		return await DB.queryNoData(
			"insert into articles (??) values(?)",
			[
				Object.keys( articleInfo ),
				Object.values( articleInfo )
			] )
	}
}

export default Article;