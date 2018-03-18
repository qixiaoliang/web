"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ejs = require("ejs");
function ejsRender(_path, data) {
    return new Promise((resolve, reject) => {
        ejs.renderFile(_path, data, (err, html) => {
            if (err)
                reject(err);
            else
                resolve(html);
        });
    });
}
exports.ejsRender = ejsRender;
class TakeInTime {
    static addData(data, ms) {
        let index = TakeInTime.datas.findIndex(item => data.token === item.token);
        if (index >= 0) {
            TakeInTime.datas.splice(index, 1);
        }
        let length = TakeInTime.datas.push(data);
        setTimeout(() => {
            TakeInTime.datas.splice(length - 1, 1);
        }, ms);
    }
    static getItem(token) {
        let index = TakeInTime.datas.findIndex(item => token === item.token);
        if (index >= 0) {
            let _a = TakeInTime.datas.splice(index, 1)[0], { token } = _a, data = __rest(_a, ["token"]);
            return data;
        }
        return null;
    }
}
TakeInTime.datas = [];
exports.TakeInTime = TakeInTime;
//# sourceMappingURL=util.js.map