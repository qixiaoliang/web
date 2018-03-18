/// <reference types="bunyan" />
import * as Logger from 'bunyan';
import * as koa from 'koa';
declare module "koa" {
    interface Context {
        log: Logger;
    }
}
export default function (ctx: koa.Context, next: () => Promise<any>): Promise<void>;
