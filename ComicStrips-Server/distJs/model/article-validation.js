"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
let articleID = Joi.number().integer().positive().max(1e13 - 1).required();
;
let getInfo, star;
getInfo = {
    query: {
        articleID: articleID
    }
};
let getArticles = {
    query: {
        category: Joi.string().regex(/^(.+,)*[^,^\s]+$/),
        author: Joi.string().min(1).max(16),
        orderBy: Joi.string().allow(['id', 'time', 'replys_count']),
        curID: Joi.number().integer().positive().min(1).max(1e13 - 1),
        limit: Joi.number().integer().positive().min(1).max(20)
    }
};
let getComments = {
    query: {
        articleID: articleID,
        orderBy: Joi.string().allow(['id', 'time', 'replys_count']),
        curID: Joi.number().integer().positive().min(1).max(1e17 - 1),
        limit: Joi.number().integer().positive().min(1).max(20)
    }
};
let addArticle = {
    body: {
        fields: Joi.object().keys({
            content: Joi.string().min(1).max(128000).required(),
            title: Joi.string().min(1).max(32).required(),
            category: Joi.string().regex(/^(.+,)*[^,^\s]+$/).allow('')
        }),
        files: Joi.object().max(0)
    }
};
let favo, unFavo;
favo = unFavo = {
    query: {
        articleID
    }
};
exports.default = {
    getInfo,
    favo,
    getComments,
    getArticles,
    addArticle,
    unFavo
};
//# sourceMappingURL=article-validation.js.map