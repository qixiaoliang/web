export declare type UserInfo = {
    email: string;
    type: 'register' | 'changePassword';
    [key: string]: any;
};
export declare class EmailVerify {
    static waitPool: UserInfo[];
    static response(userInfo: UserInfo): Promise<void>;
    static verify(token: string): Promise<{
        [key: string]: any;
    } | null>;
}
