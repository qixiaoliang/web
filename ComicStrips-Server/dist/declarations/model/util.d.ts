export declare function ejsRender(_path: string, data: object): Promise<string>;
export declare type TakeDataType = {
    token: string;
    [key: string]: any;
};
export declare class TakeInTime {
    private static datas;
    static addData(data: TakeDataType, ms: number): void;
    static getItem(token: string): {
        [key: string]: any;
    } | null;
}
