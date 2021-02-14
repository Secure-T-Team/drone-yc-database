const jwt = require('jsonwebtoken')
const Config = require('./config')

class JWT {
	constructor() {
		this.config = new Config()
	}

	create = () => {
		return jwt.sign({}, this.config.yc.apiKey, {
			keyid: this.config.yc.keyId,
			algorithm: 'PS256',
			expiresIn: '1h',
			issuer: this.config.yc.serviceAccountId,
			audience: this.config.yc.audience,
		})
	}
}

module.exports = JWT
