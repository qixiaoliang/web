declare class Email {
    private static readonly transport;
    static send(to: string, subject: string, html: string, text?: string): Promise<{}>;
}
export default Email;
