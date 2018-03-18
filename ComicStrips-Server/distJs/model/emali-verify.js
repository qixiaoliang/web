"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const querystring = require("querystring");
const crypto = require("crypto");
const email_1 = require("./email");
const util_1 = require("./util");
class EmailVerify {
    static async response(userInfo) {
        const { email, type } = userInfo;
        let hmac = crypto.createHmac('sha256', global.env.secrets.hmac + Date.now());
        hmac.update(email + type);
        const key = hmac.digest('hex');
        const { outerAddress } = global.env.net;
        const query = { key, type };
        let config = {
            register: {
                path: path_1.join(process.cwd(), './template/email-temp-register.ejs'),
                data: {
                    user: email,
                    link: `${outerAddress}/EmailVerify?${querystring.stringify(query)}`
                }
            },
            changePassword: {
                path: path_1.join(process.cwd(), './template/email-temp-changePassword.ejs'),
                data: {
                    name: userInfo.name,
                    link: `${outerAddress}/EmailVerify?${querystring.stringify(query)}`
                }
            }
        };
        let html = await util_1.ejsRender(config[type].path, config[type].data);
        let result = await email_1.default.send(email, type, html);
        if (result)
            util_1.TakeInTime.addData(Object.assign({ token: key }, userInfo), 3600 * 500);
    }
    static async verify(token) {
        return util_1.TakeInTime.getItem(token);
    }
}
EmailVerify.waitPool = [];
exports.EmailVerify = EmailVerify;
//# sourceMappingURL=emali-verify.js.map