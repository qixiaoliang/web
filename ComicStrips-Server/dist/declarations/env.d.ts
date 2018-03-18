export default interface ENV {
    readonly net: {
        readonly protocol: string;
        readonly host: string;
        readonly port: number;
        readonly outerAddress: string;
    };
    readonly email: {
        readonly host: string;
        readonly port: number;
        readonly secure: boolean;
        readonly auth: {
            readonly user: string;
            readonly pass: string;
        };
    };
    readonly db: {
        readonly host: string;
        readonly port: number;
        readonly user: string;
        readonly passwordSha1: string;
    };
    readonly secrets: {
        readonly hmac: string;
    };
}
