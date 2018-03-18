import Router = require( 'koa-router' );
const router = new Router( {
	prefix: '/api'
} )
import * as formidable from 'formidable';
import * as Joi from 'joi';
import * as path from 'path';;
import koaBody = require( 'koa-body' );
import v = require( 'koa2-validation' );

import { User } from '../model/user';
import Article from '../model/article';
import auth from '../middlewares/auth';
import u_v from '../model/user-validation';
import a_v from '../model/article-validation';
import { EmailVerify } from '../model/emali-verify';

router.get( '/hasUser',
	v( u_v.hasUser ),
	async ( ctx, next ) => {
		ctx.body =
			await User.hasUser( ctx.query.name );
	} )

router.get(
	'/avatar',
	v( u_v.avatar ),
	async ctx => {
		ctx.body = await new User( ctx.query.name ).getAvatar();
	} )

router.get(
	'/emailOwner',
	v( u_v.emailOwner ),
	async ctx => {
		let { email } = ctx.query;
		ctx.body = await User.getEmailOwner( email );
	}
)

router.get(
	'/articles',
	v( a_v.getArticles ),
	async ( ctx, next ) => {
		let { category, author, orderBy, curID, limit }
			= ctx.query;
		ctx.body = await Article.getArticles(
			category,
			author,
			orderBy,
			curID,
			limit );
	}
)

router.get(
	'/publicUserInfo',
	v( u_v.publicInfo ),
	async ctx => {
		ctx.body = await new User(
			ctx.query.name
		).getPublicInfo();
	}
)

router.get(
	'/articleComments',
	v( a_v.getComments ),
	async ( ctx, next ) => {
		let { articleID, orderBy, curID, limit }
			= ctx.query;
		ctx.body = await new Article( articleID )
			.getComments( orderBy, curID, limit );
	} )

router.get(
	'/hasEmail',
	v( u_v.hasEmail ),
	async ( ctx, next ) => {
		ctx.body = await User
			.hasEmail( ctx.query.email );
	} )

/* ------------------------------- SIGNED QUERY ---------------------------------------------- */

router.use( v( u_v.verifyUser ), auth );

router.get(
	'/changePassword',
	v( u_v.changePassword ), async ( ctx, next ) => {
		let hasUserEmail =
			new User( ctx.query.name ).hasUserEmail( ctx.query.email );
		if ( !hasUserEmail ) {
			ctx.throw( 'email can\'t match username' );
		}
		else {
			ctx.query.type = 'changePassword';
			await EmailVerify.response( ctx.query );
			ctx.body = { status: 'OK' };
		}
	} )

router.get(
	'/setAvatar',
	v( u_v.setAvatar ),
	async ctx => {
		ctx.body = await new User(
			ctx.query.name
		).setAvatar( ctx.query.avatar );
	} )

router.get(
	'/privateUserInfo',
	async  ( ctx, next ) => {
		let { name } = ctx.query;
		ctx.body = await new User( name )
			.getPrivateInfo();
	} )

router.get(
	'/userComments',
	v( u_v.getComments ),
	async ( ctx, next ) => {
		let { name, orderBy, curID, limit }
			= ctx.query;
		ctx.body = await new User( name )
			.getComments( orderBy, curID, limit );
	} )

router.get(
	'/getFavoArticles',
	async ( ctx, next ) => {
		ctx.body = await new User( ctx.query.name )
			.getFavoArticles();
	} )

router.get(
	'/userArticles',
	v( u_v.userArticles ),
	async ( ctx, next ) => {
		let { name, curID, orderBy, limit }
			= ctx.query;
		ctx.body = await new User( name )
			.getUserArticles( curID, orderBy, limit );
	} )

router.get(
	'/unFavo',
	v( u_v.unFavo ),
	async ( ctx, next ) => {
		let { commentID, name } = ctx.query;
		ctx.body = await new User( name )
			.unFavo( commentID );
	} )

router.get(
	'/favo',
	v( u_v.favo ),
	async ( ctx, next ) => {
		let { commentID, name } = ctx.query;
		ctx.body = await new User( name )
			.favo( commentID );
	} )

router.get(
	'/unOppose',
	v( u_v.unOppose ),
	async ( ctx, next ) => {
		let { commentID, name } = ctx.query;
		ctx.body =
			await new User( name ).unOppose( commentID );
	} )

router.get(
	'/oppose',
	v( u_v.oppose ),
	async ( ctx, next ) => {
		let { commentID, name } = ctx.query;
		ctx.body =
			await new User( name ).oppose( commentID );
	} )

router.get(
	'/unFavoArticle',
	async ( ctx, next ) => {
		let { name, articleID } = ctx.query;
		ctx.body =
			await new Article( articleID ).unFavo( name );
	} )

router.get(
	'/favoArticle',
	v( a_v.favo ),
	async ( ctx, next ) => {
		let { name, articleID } = ctx.query;
		ctx.body =
			await new Article( articleID ).favo( name );
	} )

router.post(
	'/addReply',
	koaBody( { multipart: true } ),
	v( u_v.addReply ),
	async ( ctx, next ) => {
		let { name } = ctx.query;
		let { commentID, content }
			= ctx.request.body.fields;
		ctx.body = await new User( name )
			.addReply( commentID, content );
	} )

router.post(
	'/addComment',
	koaBody( { multipart: true } ),
	v( u_v.addComment ),
	async ( ctx, next ) => {
		let { name } = ctx.query;
		let { content, articleID }
			= ctx.request.body.fields;
		let commentInfo = { content, article_id: articleID };
		ctx.body = await new User( name )
			.addComment( commentInfo );
	} )

router.post(
	'/addArticle',
	koaBody( { multipart: true } ),
	v( a_v.addArticle ),
	async ( ctx, next ) => {
		let { name } = ctx.query;
		let fields =
			ctx.body = ctx.request.body.fields;
		fields.author = name;
		await Article.addArticle( fields );
	} )

router.post(
	'/upLoad',
	koaBody( {
		multipart: true,
		formidable: {
			keepExtensions: true,
			uploadDir: path.join( process.cwd(), './src' ),
			onFileBegin: ( name, file ) => {
			}
		}
	} ),
	ctx => {
		let files: formidable.Files = ctx.request.body.files;
		if ( files ) {
			let _files: { [ key: string ]: string } = {};
			for ( let k in files ) {
				let p = path.parse( files[ k ].path );
				_files[ k ] = p.name + p.ext;
			}
			ctx.body = _files;
		}
		else ctx.body = null;
	} );

export default router;

