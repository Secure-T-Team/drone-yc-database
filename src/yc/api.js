const axios = require('axios').default
const Config = require('../config')
const JWT = require('../jwt')

// TODO TEST
class YC {
	constructor() {
		this.config = new Config()
	}

	async login() {
		console.log('try login...')
		if (this.iamToken) return iamToken
		const jwt = new JWT().create()

		const { iamToken, message } = await (await axios.post(this.config.yc.audience, { jwt })).data

		if (!iamToken) {
			throw new Error(message)
		}
		this.iamToken = iamToken
		this.api = axios.create({
			headers: {
				Authorization: `Bearer ${this.iamToken}`,
			},
		})
		console.log('auth ok')
		return iamToken
	}

	async createDB(db_name) {
		const url = `https://mdb.api.cloud.yandex.net/managed-postgresql/v1/clusters/${this.config.db.clusterId}/databases`
		const data = {
			databaseSpec: {
				name: db_name,
				owner: this.config.db.user,
				lcCollate: 'ru_RU.UTF-8',
				lcCtype: 'ru_RU.UTF-8',
				extensions: [
					{
						name: 'btree_gist',
						version: '12',
					},
				],
			},
		}
		console.log('start creating db...')
		try {
			const { id } = await (await this.api.post(url, data)).data
			console.log('wait for db creating...')
			await this.waitForOperation(id)
		} catch (err) {
			throw JSON.stringify(err.response.data, null, 4)
		}
	}

	async waitForOperation(id) {
		const url = `https://operation.api.cloud.yandex.net/operations/${id}`

		for (let i = 0; i < 50; i++) {
			const { done } = await (await this.api.get(url)).data
			if (done) {
				return true
			}
			await sleep(5000)
		}
		throw 'cannot create db'
	}
}

module.exports = YC

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}
