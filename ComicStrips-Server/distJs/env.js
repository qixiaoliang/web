"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let env = {
    "net": {
        "protocol": "http",
        "host": "localhost",
        "port": 5555,
        "outerAddress": "http://zcgzxg.55555.io/comic"
    },
    "email": {
        "host": "smtp.qq.com",
        "port": 465,
        "secure": true,
        "auth": {
            "user": "1134495285",
            "pass": "srvqodkfxiftffbi"
        }
    },
    "db": {
        "host": "localhost",
        "port": 3306,
        "user": "root",
        "passwordSha1": "RlWWcGREzJXaiYv0qC0OOgU/ZJE="
    },
    "secrets": {
        "hmac": "psmac_13569"
    }
};
Object.assign(global, { env });
//# sourceMappingURL=env.js.map