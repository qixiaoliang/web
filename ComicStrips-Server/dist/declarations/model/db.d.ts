export declare type DBDataResult = {
    [key: string]: any;
}[];
export declare type DBInfoResult = {
    affectedRows: number;
    affectedChanges: number;
};
export declare class DB {
    static pool: any;
    static getPool(): Promise<void>;
    static queryNoData(query: string, data?: any[]): Promise<DBInfoResult>;
    static query(query: string, data?: any[]): Promise<DBDataResult>;
    static keyToLowerCase(obj: any): object;
    static getConn(): Promise<any>;
}
