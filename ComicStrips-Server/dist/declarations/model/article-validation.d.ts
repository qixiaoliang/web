/// <reference types="koa2-validation" />
import { QueryValidation as QV, BodyValidation as BV } from 'koa2-validation';
declare const _default: {
    getInfo: QV;
    favo: QV;
    getComments: QV;
    getArticles: QV;
    addArticle: BV;
    unFavo: QV;
};
export default _default;
