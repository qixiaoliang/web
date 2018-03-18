"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const Joi = require("joi");
const router = new Router();
const path = require("path");
const emali_verify_1 = require("../model/emali-verify");
const user_1 = require("../model/user");
const v = require("koa2-validation");
const util_1 = require("../model/util");
const registerSchema = {
    query: {
        name: Joi.string().min(1)
            .max(16).required(),
        password: Joi.string().token().min(8)
            .max(24).required(),
        email: Joi.string().email().required()
    }
};
const verifySchema = {
    query: {
        key: Joi.string().hex().required(),
        type: Joi.string().valid(['register', 'changePassword']).required()
    }
};
router.get('/registerUser', v(registerSchema), async (ctx, next) => {
    ctx.query.type = 'register';
    let { name, email } = ctx.query;
    let hasEmail = await user_1.User.hasEmail(email);
    let hasUser = await user_1.User.hasUser(name);
    if (hasEmail || hasUser) {
        ctx.throw(400, 'name or email exists');
    }
    else {
        await emali_verify_1.EmailVerify.response(ctx.query);
        ctx.body = { status: 'OK' };
    }
});
router.get('/emailVerify', v(verifySchema), async (ctx, next) => {
    let { key, type } = ctx.query;
    let userInfo = await emali_verify_1.EmailVerify.verify(key);
    if (userInfo) {
        if (type === 'register') {
            let { name, password, email } = userInfo;
            ctx.body = await user_1.User.addUser({
                name, password, email
            });
            ctx.redirect('/');
        }
        if (type === 'changePassword') {
            let { name, newPassword, oldPassword } = userInfo;
            ctx.body = await user_1.User
                .changePassword(name, newPassword, oldPassword);
        }
    }
    else {
        ctx.body = await util_1.ejsRender(path.join(process.cwd(), './template/InvalidVerify.ejs'), {});
    }
});
exports.default = router;
//# sourceMappingURL=email-verify-router.js.map