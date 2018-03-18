declare class Article {
    ID: number;
    constructor(articleID: number);
    getInfo(): Promise<object>;
    removeArticle(): Promise<{
        affectedRows: number;
        affectedChanges: number;
    }>;
    favo(name: string): Promise<{
        affectedRows: number;
        affectedChanges: number;
    }>;
    unFavo(name: string): Promise<{
        affectedRows: number;
        affectedChanges: number;
    }>;
    getComments(orderBy?: string, curID?: number, limit?: number): Promise<object>;
    static getArticles(category?: string, author?: string, orderBy?: string, curID?: number, limit?: number): Promise<object>;
    static addArticle(articleInfo: object): Promise<{
        affectedRows: number;
        affectedChanges: number;
    }>;
}
export default Article;
