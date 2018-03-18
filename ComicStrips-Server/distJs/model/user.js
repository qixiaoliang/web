"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
const db_1 = require("./db");
class User {
    constructor(name) {
        this.name = name;
    }
    async removeUser() {
        return await db_1.DB.queryNoData('delete from users where name=? limit 1', [this.name]);
    }
    async addComment(commentInfo) {
        commentInfo.name = this.name;
        return await db_1.DB.queryNoData("insert into article_comment (replys,??) values('[]',?)", [
            Object.keys(commentInfo),
            Object.values(commentInfo)
        ]);
    }
    async addReply(commentID, content) {
        let replyInfo = {
            content,
            name: this.name,
            time: new Date()
        };
        return await db_1.DB.queryNoData("update article_comment set replys=json_array_append(replys,'$',?) " +
            "where id=? limit 1", [JSON.stringify(replyInfo), commentID]);
    }
    async hasUserEmail(email) {
        let hasEmail = await db_1.DB.query('select email from users where email=? and name=? limit 1', [email, this.name]);
        if (hasEmail && hasEmail.length) {
            return true;
        }
        else {
            return false;
        }
    }
    async favo(commentID) {
        return await db_1.DB.queryNoData("insert into comment_favo (comment_id,name,type) values(?,?,'FAVO')", [commentID, this.name]);
    }
    async unFavo(commentID) {
        return await db_1.DB.queryNoData("delete from comment_favo where comment_id=? and " +
            "name=? and type='FAVO' limit 1", [commentID, this.name]);
    }
    async unOppose(commentID) {
        return await db_1.DB.queryNoData("delete from comment_favo where comment_id=? and " +
            "name=? and type='OPPOSE' limit 1", [commentID, this.name]);
    }
    async oppose(commentID) {
        return await db_1.DB.queryNoData("insert into comment_favo (comment_id,name,type) values(?,?,'OPPOSE')", [commentID, this.name]);
    }
    async getAvatar() {
        let avatars = await db_1.DB.query('select icon from users where name=? limit 1', [this.name]);
        return avatars[0].icon;
    }
    async getPublicInfo() {
        let infos = await db_1.DB.query('select name,icon from users where name=? limit 1', [this.name]);
        return infos[0];
    }
    async getPrivateInfo() {
        let infos = await db_1.DB.query('select name,email,icon,time from users where name=? limit 1', [this.name]);
        return infos[0];
    }
    async getComments(orderBy = 'id', commentID = 1.79e+308, limit = 20) {
        let comments = await db_1.DB.query('select * from article_comment where name=? and id<? order by ?? desc limit ?', [this.name, commentID, orderBy, limit]);
        comments.forEach(item => {
            let replys = item['REPLYS'];
            item['REPLYS'] = replys.map(v => JSON.parse(v));
        });
        return db_1.DB.keyToLowerCase(comments);
    }
    async getFavoArticles() {
        return db_1.DB.query('select article_id from article_favo where name=?', [this.name]);
    }
    async setAvatar(avatar) {
        return await db_1.DB.queryNoData('update users set icon=? where name=? limit 1', [avatar, this.name]);
    }
    async getUserArticles(curID = 1.7e+308, orderBy = 'id', limit = 20) {
        let articles = await db_1.DB.query('select * from articles where author=? and id<? order by ?? desc limit ?', [this.name, curID, orderBy, limit]);
        articles.forEach(article => {
            article['CONTENT'] = article['CONTENT'].toString('utf8');
        });
        return db_1.DB.keyToLowerCase(articles);
    }
    /* -------------------- static methods ------------------------------------------------ */
    static async getEmailOwner(email) {
        let owner = await db_1.DB.query('select name from users where email=? limit 1', [email]);
        return owner[0].name;
    }
    static async hasUser(name) {
        let hasUser = await db_1.DB.query('select name from users where name=? limit 1', [name]);
        if (hasUser && hasUser.length) {
            return true;
        }
        else {
            return false;
        }
    }
    static async changePassword(name, password, oldPassword) {
        let _password = await db_1.DB.query('select password from users where name=? limit 1', [name]);
        //@ts-ignore
        if (_password[0] && (_password[0].password === oldPassword)) {
            return await db_1.DB.query('update users set password=? where name=? limit 1', [password, name]);
        }
        else {
            throw new Error('oldPassword invalid');
        }
    }
    static async hasEmail(email) {
        let hasEmail = await db_1.DB.query('select email from users where email=? limit 1', [email]);
        if (hasEmail && hasEmail.length) {
            return true;
        }
        else {
            return false;
        }
    }
    static async addUser(info) {
        return await db_1.DB.query('insert into users (??) values (?)', [
            Object.keys(info),
            Object.values(info)
        ]);
    }
    static async verifyUser(name, hmacPassword, timeStamp) {
        if (Date.now() - Number(timeStamp) > 1000 * 60) {
            return false;
        }
        let password = await db_1.DB.query('select password from users where name=? limit 1', [name]);
        if (password[0]) {
            let hmac = crypto.createHmac('sha256', timeStamp);
            let md5 = crypto.createHash('md5');
            md5.update(password[0].password);
            let m = md5.digest('hex');
            hmac.update(m);
            let h = hmac.digest('hex');
            return h === hmacPassword;
        }
        return false;
    }
}
exports.User = User;
//# sourceMappingURL=user.js.map