"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require("nodemailer");
;
class Email {
    static get transport() {
        return nodemailer.createTransport(global.env.email);
    }
    static send(to, subject, html, text = '') {
        const option = {
            from: '"zcgzx" <1134495285@qq.com>',
            to, subject, html, text
        };
        return new Promise((resolve, reject) => {
            Email.transport.sendMail(option, (err, info) => {
                if (err)
                    reject(err);
                else
                    resolve(true);
            });
        });
    }
}
exports.default = Email;
//# sourceMappingURL=email.js.map