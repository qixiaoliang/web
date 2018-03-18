import bunyan = require('bunyan');
import * as Logger from 'bunyan';
import * as path from 'path';
import * as koa from 'koa';

declare module "koa" {
	interface Context {
		log: Logger
	}
}

let log = bunyan.createLogger({
	name: 'Comic Strips',
	streams: [
		{
			level: 'info',
			path: path.join(
				process.cwd(), './log/log.json'
			),
			type: 'rotating-file',
			period: '1d',
			count: 7
		},
		{
			level: 'error',
			path: path.join(
				process.cwd(), './log/err.json'
			),
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
})

export default async function (ctx: koa.Context, next: () => Promise<any>) {
	ctx.log = log;
	let startTime = Date.now();

	await next();

	let logData: {
		[key: string]: any
	} = {
			takeTimes: Date.now() - startTime + 'ms',
			reqURL: ctx.req.url,
			reqMethod: ctx.req.method,
			resCode: ctx.status
		}

	if (ctx.status !== 200) {
		logData.content =
			ctx.length > 100 ?
				ctx.length : ctx.body && ctx.body.toString()
	}

	log.info(logData)
}