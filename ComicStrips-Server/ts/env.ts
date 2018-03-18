export default interface ENV {
	readonly net: {
		readonly protocol: string,
		readonly host: string,
		readonly port: number,
		readonly outerAddress: string
	},
	readonly email: {
		readonly host: string,
		readonly port: number,
		readonly secure: boolean,
		readonly auth: {
			readonly user: string,
			readonly pass: string
		}
	},
	readonly db: {
		readonly host: string,
		readonly port: number,
		readonly user: string,
		readonly passwordSha1: string
	},
	readonly secrets: {
		readonly hmac: string
	}
}

let env: ENV = {
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
}

Object.assign( global, { env } );