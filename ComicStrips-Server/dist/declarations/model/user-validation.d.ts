/// <reference types="koa2-validation" />
import { QueryValidation as QV, BodyValidation as BV } from 'koa2-validation';
declare const _default: {
    addUser: QV;
    setAvatar: QV;
    oppose: QV;
    favo: QV;
    hasUser: QV;
    getInfo: undefined;
    verifyUser: QV;
    getComments: QV;
    addReply: BV;
    addComment: BV;
    favoArticles: undefined;
    userArticles: QV;
    hasEmail: QV;
    changePassword: QV;
    unFavo: QV;
    unOppose: QV;
    avatar: QV;
    emailOwner: QV;
    publicInfo: QV;
};
export default _default;
