"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const koa = require("koa");
const app = new koa();
const http = require("http");
require("./env");
const api_route_1 = require("./routes/api-route");
const log_1 = require("./middlewares/log");
const file_server_1 = require("./routes/file-server");
const email_verify_router_1 = require("./routes/email-verify-router");
const gzip_1 = require("./middlewares/gzip");
app.use(log_1.default);
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    try {
        await next();
        if (typeof ctx.body === 'string') {
            ctx.body = JSON.stringify(ctx.body);
        }
    }
    catch (e) {
        ctx.status = e.status || 400;
        ctx.body = { error: e.message || 'ERROR' };
        ctx.log.error({ e });
    }
});
app.use(gzip_1.default);
app.use(file_server_1.default);
app.use(api_route_1.default.routes());
app.use(api_route_1.default.allowedMethods());
app.use(email_verify_router_1.default.routes());
app.use(email_verify_router_1.default.allowedMethods());
const { port, host } = global.env.net;
let server = http.createServer(app.callback());
server.listen(port, host);
process.on('uncaughtException', (err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map