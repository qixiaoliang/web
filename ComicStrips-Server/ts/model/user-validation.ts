import { QueryValidation as QV, BodyValidation as BV }
	from 'koa2-validation';
import * as Joi from 'joi';

let name = Joi.string().min( 1 ).max( 16 ).required()

let hasEmail: QV = {
	query: {
		email: Joi.string().email().required()
	}
}

let addUser: QV = {
	query: {
		name,
		password: Joi.string().token().min( 8 ).max( 24 ).required(),
		email: Joi.string().email().required(),
		icon: Joi.string().min( 2 )
	}
}

let getInfo, favoArticles;
let hasUser: QV, avatar: QV, publicInfo: QV;
hasUser = avatar = publicInfo = {
	query: {
		name
	}
}

let addComment: BV = {
	body: {
		fields: Joi.object().keys( {
			content: Joi.string().min( 1 ).max( 256 ).required(),
			articleID: Joi.number().integer().positive().max( 1e13 - 1 ).required()
		} ),
		files: Joi.object().max( 0 )
	}
}

let favo: QV, oppose: QV, unFavo: QV, unOppose: QV;
favo = oppose = unFavo = unOppose = {
	query: {
		commentID: Joi.number().integer().positive().max( 1e17 - 1 ).required()
	}
}

let addReply: BV = {
	body: {
		fields: Joi.object().keys( {
			commentID: Joi.number().integer().positive().max( 1e17 - 1 ).required(),
			content: Joi.string().min( 1 ).max( 256 ).required()
		} ),
		files: Joi.object().max( 0 )
	}
}

let verifyUser: QV = {
	query: {
		name,
		password: Joi.string().hex().required(),
		timeStamp: Joi.string().regex( /^\d{13,}$/ ).required()
	}
}

let getComments: QV, userArticles: QV;
getComments = userArticles = {
	query: {
		orderBy: Joi.string().allow( [ 'id', 'time', 'replys_count' ] ),
		curID: Joi.number().integer().positive().min( 1 ).max( 1e17 - 1 ),
		limit: Joi.number().integer().positive().min( 1 ).max( 20 )
	}
}

let setAvatar: QV = {
	query: {
		avatar: Joi.string().required()
	}
}

let emailOwner: QV = {
	query: {
		email: Joi.string().email().required()
	}
}

let changePassword: QV = {
	query: {
		email: Joi.string().email().required(),
		newPassword: Joi.string().token().min( 8 )
			.max( 24 ).required(),
		oldPassword: Joi.string().token().min( 8 )
			.max( 24 ).required()
	}
}

export default {
	addUser,
	setAvatar,
	oppose,
	favo,
	hasUser,
	getInfo,
	verifyUser,
	getComments,
	addReply,
	addComment,
	favoArticles,
	userArticles,
	hasEmail,
	changePassword,
	unFavo,
	unOppose,
	avatar,
	emailOwner,
	publicInfo
}