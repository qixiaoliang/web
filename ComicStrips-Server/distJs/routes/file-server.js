"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const staticServer = require("koa-static-cache");
const path = require("path");
let dir = path.join(process.cwd(), './src/');
exports.default = staticServer(dir, {
    maxAge: 3600 * 1000 * 24 * 365,
    buffer: true,
    gzip: true,
    usePrecompiledGzip: true,
    dynamic: true,
    prefix: '/src'
});
//# sourceMappingURL=file-server.js.map