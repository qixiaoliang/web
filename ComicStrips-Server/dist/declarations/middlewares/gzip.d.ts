import * as koa from 'koa';
export default function (ctx: koa.Context, next: () => Promise<any>): Promise<void>;
