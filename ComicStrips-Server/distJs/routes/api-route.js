"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const router = new Router({
    prefix: '/api'
});
const path = require("path");
;
const koaBody = require("koa-body");
const v = require("koa2-validation");
const user_1 = require("../model/user");
const article_1 = require("../model/article");
const auth_1 = require("../middlewares/auth");
const user_validation_1 = require("../model/user-validation");
const article_validation_1 = require("../model/article-validation");
const emali_verify_1 = require("../model/emali-verify");
router.get('/hasUser', v(user_validation_1.default.hasUser), async (ctx, next) => {
    ctx.body =
        await user_1.User.hasUser(ctx.query.name);
});
router.get('/avatar', v(user_validation_1.default.avatar), async (ctx) => {
    ctx.body = await new user_1.User(ctx.query.name).getAvatar();
});
router.get('/emailOwner', v(user_validation_1.default.emailOwner), async (ctx) => {
    let { email } = ctx.query;
    ctx.body = await user_1.User.getEmailOwner(email);
});
router.get('/articles', v(article_validation_1.default.getArticles), async (ctx, next) => {
    let { category, author, orderBy, curID, limit } = ctx.query;
    ctx.body = await article_1.default.getArticles(category, author, orderBy, curID, limit);
});
router.get('/publicUserInfo', v(user_validation_1.default.publicInfo), async (ctx) => {
    ctx.body = await new user_1.User(ctx.query.name).getPublicInfo();
});
router.get('/articleComments', v(article_validation_1.default.getComments), async (ctx, next) => {
    let { articleID, orderBy, curID, limit } = ctx.query;
    ctx.body = await new article_1.default(articleID)
        .getComments(orderBy, curID, limit);
});
router.get('/hasEmail', v(user_validation_1.default.hasEmail), async (ctx, next) => {
    ctx.body = await user_1.User
        .hasEmail(ctx.query.email);
});
/* ------------------------------- SIGNED QUERY ---------------------------------------------- */
router.use(v(user_validation_1.default.verifyUser), auth_1.default);
router.get('/changePassword', v(user_validation_1.default.changePassword), async (ctx, next) => {
    let hasUserEmail = new user_1.User(ctx.query.name).hasUserEmail(ctx.query.email);
    if (!hasUserEmail) {
        ctx.throw('email can\'t match username');
    }
    else {
        ctx.query.type = 'changePassword';
        await emali_verify_1.EmailVerify.response(ctx.query);
        ctx.body = { status: 'OK' };
    }
});
router.get('/setAvatar', v(user_validation_1.default.setAvatar), async (ctx) => {
    ctx.body = await new user_1.User(ctx.query.name).setAvatar(ctx.query.avatar);
});
router.get('/privateUserInfo', async (ctx, next) => {
    let { name } = ctx.query;
    ctx.body = await new user_1.User(name)
        .getPrivateInfo();
});
router.get('/userComments', v(user_validation_1.default.getComments), async (ctx, next) => {
    let { name, orderBy, curID, limit } = ctx.query;
    ctx.body = await new user_1.User(name)
        .getComments(orderBy, curID, limit);
});
router.get('/getFavoArticles', async (ctx, next) => {
    ctx.body = await new user_1.User(ctx.query.name)
        .getFavoArticles();
});
router.get('/userArticles', v(user_validation_1.default.userArticles), async (ctx, next) => {
    let { name, curID, orderBy, limit } = ctx.query;
    ctx.body = await new user_1.User(name)
        .getUserArticles(curID, orderBy, limit);
});
router.get('/unFavo', v(user_validation_1.default.unFavo), async (ctx, next) => {
    let { commentID, name } = ctx.query;
    ctx.body = await new user_1.User(name)
        .unFavo(commentID);
});
router.get('/favo', v(user_validation_1.default.favo), async (ctx, next) => {
    let { commentID, name } = ctx.query;
    ctx.body = await new user_1.User(name)
        .favo(commentID);
});
router.get('/unOppose', v(user_validation_1.default.unOppose), async (ctx, next) => {
    let { commentID, name } = ctx.query;
    ctx.body =
        await new user_1.User(name).unOppose(commentID);
});
router.get('/oppose', v(user_validation_1.default.oppose), async (ctx, next) => {
    let { commentID, name } = ctx.query;
    ctx.body =
        await new user_1.User(name).oppose(commentID);
});
router.get('/unFavoArticle', async (ctx, next) => {
    let { name, articleID } = ctx.query;
    ctx.body =
        await new article_1.default(articleID).unFavo(name);
});
router.get('/favoArticle', v(article_validation_1.default.favo), async (ctx, next) => {
    let { name, articleID } = ctx.query;
    ctx.body =
        await new article_1.default(articleID).favo(name);
});
router.post('/addReply', koaBody({ multipart: true }), v(user_validation_1.default.addReply), async (ctx, next) => {
    let { name } = ctx.query;
    let { commentID, content } = ctx.request.body.fields;
    ctx.body = await new user_1.User(name)
        .addReply(commentID, content);
});
router.post('/addComment', koaBody({ multipart: true }), v(user_validation_1.default.addComment), async (ctx, next) => {
    let { name } = ctx.query;
    let { content, articleID } = ctx.request.body.fields;
    let commentInfo = { content, article_id: articleID };
    ctx.body = await new user_1.User(name)
        .addComment(commentInfo);
});
router.post('/addArticle', koaBody({ multipart: true }), v(article_validation_1.default.addArticle), async (ctx, next) => {
    let { name } = ctx.query;
    let fields = ctx.body = ctx.request.body.fields;
    fields.author = name;
    await article_1.default.addArticle(fields);
});
router.post('/upLoad', koaBody({
    multipart: true,
    formidable: {
        keepExtensions: true,
        uploadDir: path.join(process.cwd(), './src'),
        onFileBegin: (name, file) => {
        }
    }
}), ctx => {
    let files = ctx.request.body.files;
    if (files) {
        let _files = {};
        for (let k in files) {
            let p = path.parse(files[k].path);
            _files[k] = p.name + p.ext;
        }
        ctx.body = _files;
    }
    else
        ctx.body = null;
});
exports.default = router;
//# sourceMappingURL=api-route.js.map