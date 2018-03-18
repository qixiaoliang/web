"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../model/user");
async function default_1(ctx, next) {
    let { name, password, timeStamp } = ctx.query;
    let verified = await user_1.User.verifyUser(name, password, timeStamp);
    if (verified)
        await next();
    else {
        ctx.throw(401, 'unauthorization');
    }
}
exports.default = default_1;
//# sourceMappingURL=auth.js.map