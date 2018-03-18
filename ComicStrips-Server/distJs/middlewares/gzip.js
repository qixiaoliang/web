"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zlib = require("zlib");
async function default_1(ctx, next) {
    await next();
    if ((ctx.response.is('json') ||
        ctx.response.is('text') ||
        ctx.response.is('html') ||
        typeof ctx.body === 'string') &&
        ctx.response.length > 1000) {
        if (ctx.response.is('json')) {
            ctx.body = await gzip(Buffer.from(JSON.stringify(ctx.body), 'utf8'));
            ctx.set('Content-encoding', 'gzip');
        }
        else if (typeof ctx.body === 'string') {
            ctx.body = await gzip(Buffer.from(ctx.body, 'utf8'));
            ctx.set('Content-encoding', 'gzip');
        }
        else if (Buffer.isBuffer(ctx.body)) {
            ctx.body = await gzip(ctx.body);
            ctx.set('Content-encoding', 'gzip');
        }
        ctx.set('Content-encoding', 'gzip');
    }
}
exports.default = default_1;
function gzip(buf) {
    return new Promise((resolve, reject) => {
        let gz = zlib.gzip(buf, (err, result) => {
            if (err)
                reject(err);
            else
                resolve(result);
        });
    });
}
//# sourceMappingURL=gzip.js.map