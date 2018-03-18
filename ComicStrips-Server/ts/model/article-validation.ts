import { QueryValidation as QV, BodyValidation as BV }
	from 'koa2-validation';

import * as Joi from 'joi';

let articleID = Joi.number().integer().positive().max( 1e13 - 1 ).required();;
let getInfo: QV, star;
getInfo = {
	query: {
		articleID: articleID
	}
}

let getArticles: QV = {
	query: {
		category: Joi.string().regex( /^(.+,)*[^,^\s]+$/ ),
		author: Joi.string().min( 1 ).max( 16 ),
		orderBy: Joi.string().allow( [ 'id', 'time', 'replys_count' ] ),
		curID: Joi.number().integer().positive().min( 1 ).max( 1e13 - 1 ),
		limit: Joi.number().integer().positive().min( 1 ).max( 20 )
	}
}

let getComments: QV = {
	query: {
		articleID: articleID,
		orderBy: Joi.string().allow( [ 'id', 'time', 'replys_count' ] ),
		curID: Joi.number().integer().positive().min( 1 ).max( 1e17 - 1 ),
		limit: Joi.number().integer().positive().min( 1 ).max( 20 )
	}
}

let addArticle: BV = {
	body: {
		fields: Joi.object().keys( {
			content: Joi.string().min( 1 ).max( 128000 ).required(),
			title: Joi.string().min( 1 ).max( 32 ).required(),
			category: Joi.string().regex( /^(.+,)*[^,^\s]+$/ ).allow( '' )
		} ),
		files: Joi.object().max( 0 )
	}
}

let favo: QV, unFavo: QV;
favo = unFavo = {
	query: {
		articleID
	}
}

export default {
	getInfo,
	favo,
	getComments,
	getArticles,
	addArticle,
	unFavo
}