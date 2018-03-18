"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-ignore
const sql = require("mysql2/promise");
class DB {
    static async getPool() {
        const { user, host, port, passwordSha1 } = global.env.db;
        if (!DB.pool) {
            DB.pool = await sql.createPool({
                user, host, port,
                database: 'comisstrips_test',
                passwordSha1: Buffer.from(passwordSha1, 'base64')
            });
        }
    }
    static async queryNoData(query, data = []) {
        await DB.getPool();
        const conn = await DB.pool.getConnection();
        const result = await conn.query(query, data);
        conn.release();
        return {
            affectedChanges: result[0].affectedChanges,
            affectedRows: result[0].affectedRows
        };
    }
    static async query(query, data = []) {
        await DB.getPool();
        const conn = await DB.pool.getConnection();
        const result = await conn.query(query, data);
        conn.release();
        return result && result[0];
    }
    static keyToLowerCase(obj) {
        if (Array.isArray(obj))
            return obj.map(val => DB.keyToLowerCase(val));
        let lowerCaseObj = {};
        for (let k in obj) {
            lowerCaseObj[k.toLowerCase()] = obj[k];
        }
        return lowerCaseObj;
    }
    static async getConn() {
        await DB.getPool();
        const conn = await DB.pool.createConnection();
        return conn;
    }
}
DB.pool = null;
exports.DB = DB;
//# sourceMappingURL=db.js.map