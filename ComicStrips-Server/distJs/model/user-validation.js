"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
let name = Joi.string().min(1).max(16).required();
let hasEmail = {
    query: {
        email: Joi.string().email().required()
    }
};
let addUser = {
    query: {
        name,
        password: Joi.string().token().min(8).max(24).required(),
        email: Joi.string().email().required(),
        icon: Joi.string().min(2)
    }
};
let getInfo, favoArticles;
let hasUser, avatar, publicInfo;
hasUser = avatar = publicInfo = {
    query: {
        name
    }
};
let addComment = {
    body: {
        fields: Joi.object().keys({
            content: Joi.string().min(1).max(256).required(),
            articleID: Joi.number().integer().positive().max(1e13 - 1).required()
        }),
        files: Joi.object().max(0)
    }
};
let favo, oppose, unFavo, unOppose;
favo = oppose = unFavo = unOppose = {
    query: {
        commentID: Joi.number().integer().positive().max(1e17 - 1).required()
    }
};
let addReply = {
    body: {
        fields: Joi.object().keys({
            commentID: Joi.number().integer().positive().max(1e17 - 1).required(),
            content: Joi.string().min(1).max(256).required()
        }),
        files: Joi.object().max(0)
    }
};
let verifyUser = {
    query: {
        name,
        password: Joi.string().hex().required(),
        timeStamp: Joi.string().regex(/^\d{13,}$/).required()
    }
};
let getComments, userArticles;
getComments = userArticles = {
    query: {
        orderBy: Joi.string().allow(['id', 'time', 'replys_count']),
        curID: Joi.number().integer().positive().min(1).max(1e17 - 1),
        limit: Joi.number().integer().positive().min(1).max(20)
    }
};
let setAvatar = {
    query: {
        avatar: Joi.string().required()
    }
};
let emailOwner = {
    query: {
        email: Joi.string().email().required()
    }
};
let changePassword = {
    query: {
        email: Joi.string().email().required(),
        newPassword: Joi.string().token().min(8)
            .max(24).required(),
        oldPassword: Joi.string().token().min(8)
            .max(24).required()
    }
};
exports.default = {
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
};
//# sourceMappingURL=user-validation.js.map