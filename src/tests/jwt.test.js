const JWT = require('../jwt')
const jsonwebtoken = require('jsonwebtoken')
const Config = require('../config')

jest.mock('../config')

const config = new Config()

describe('JWT', () => {
	describe('create', () => {
		it('must call jwt sign', () => {
			const jwt = new JWT()
			jwt.create()
			expect(jsonwebtoken.sign).toBeCalledWith({}, config.yc.apiKey, {
				keyid: config.yc.keyId,
				algorithm: 'PS256',
				expiresIn: '1h',
				issuer: config.yc.serviceAccountId,
				audience: config.yc.audience,
			})
		})
		it('must return token', () => {
			const jwt = new JWT()
			expect(jwt.create()).toEqual(jsonwebtoken.sign())
		})
	})
})
