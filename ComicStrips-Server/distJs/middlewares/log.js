"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bunyan = require("bunyan");
const path = require("path");
let log = bunyan.createLogger({
    name: 'Comic Strips',
    streams: [
        {
            level: 'info',
            path: path.join(process.cwd(), './log/log.json'),
            type: 'rotating-file',
            period: '1d',
            count: 7
        },
        {
            level: 'error',
            path: path.join(process.cwd(), './log/err.json'),
            type: 'rotating-file',
            period: '1d',
            count: 7
        }
    ],
    serializers: {
        err: bunyan.stdSerializers.err,
        req: bunyan.stdSerializers.req,
        res: bunyan.stdSerializers.res
    }
});
async function default_1(ctx, next) {
    ctx.log = log;
    let startTime = Date.now();
    await next();
    let logData = {
        takeTimes: Date.now() - startTime + 'ms',
        reqURL: ctx.req.url,
        reqMethod: ctx.req.method,
        resCode: ctx.status
    };
    if (ctx.status !== 200) {
        logData.content =
            ctx.length > 100 ?
                ctx.length : ctx.body && ctx.body.toString();
    }
    log.info(logData);
}
exports.default = default_1;
//# sourceMappingURL=log.js.map