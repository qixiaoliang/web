export declare type CommentInfo = {
    name?: string;
    article_id: number;
    content: string;
};
export declare type UserInfo = {
    name: string;
    password: string;
    email: string;
    icon?: string;
};
export declare class User {
    name: string;
    constructor(name: string);
    removeUser(): Promise<{
        affectedRows: number;
        affectedChanges: number;
    }>;
    addComment(commentInfo: CommentInfo): Promise<{
        affectedRows: number;
        affectedChanges: number;
    }>;
    addReply(commentID: number, content: string): Promise<{
        affectedRows: number;
        affectedChanges: number;
    }>;
    hasUserEmail(email: string): Promise<boolean>;
    favo(commentID: number): Promise<{
        affectedRows: number;
        affectedChanges: number;
    }>;
    unFavo(commentID: number): Promise<{
        affectedRows: number;
        affectedChanges: number;
    }>;
    unOppose(commentID: number): Promise<{
        affectedRows: number;
        affectedChanges: number;
    }>;
    oppose(commentID: number): Promise<{
        affectedRows: number;
        affectedChanges: number;
    }>;
    getAvatar(): Promise<any>;
    getPublicInfo(): Promise<{
        [key: string]: any;
    }>;
    getPrivateInfo(): Promise<{
        [key: string]: any;
    }>;
    getComments(orderBy?: string, commentID?: number, limit?: number): Promise<object>;
    getFavoArticles(): Promise<{
        [key: string]: any;
    }[]>;
    setAvatar(avatar: string): Promise<{
        affectedRows: number;
        affectedChanges: number;
    }>;
    getUserArticles(curID?: number, orderBy?: string, limit?: number): Promise<object>;
    static getEmailOwner(email: string): Promise<any>;
    static hasUser(name: string): Promise<boolean>;
    static changePassword(name: string, password: string, oldPassword: string): Promise<{
        [key: string]: any;
    }[]>;
    static hasEmail(email: string): Promise<boolean>;
    static addUser(info: UserInfo): Promise<{
        [key: string]: any;
    }[]>;
    static verifyUser(name: string, hmacPassword: string, timeStamp: string): Promise<boolean>;
}
