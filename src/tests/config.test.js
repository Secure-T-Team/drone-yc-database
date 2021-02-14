const Config = require('../config')

const env = {
	PLUGIN_YC_API_KEY: 'PLUGIN_YC_API_KEY',
	PLUGIN_YC_SERVICE_ACCOUNT_ID: 'PLUGIN_YC_SERVICE_ACCOUNT_ID',
	PLUGIN_YC_KEY_ID: 'PLUGIN_YC_KEY_ID',
	DRONE_SOURCE_BRANCH: 'DRONE-SOURCE-BRANCH',
	PLUGIN_DB_CLUSTER_ID: 'PLUGIN_DB_CLUSTER_ID',
	PLUGIN_DB_USER: 'PLUGIN_DB_USER',
	PLUGIN_DB_HOST: 'PLUGIN_DB_HOST',
	PLUGIN_DB_PORT: 'PLUGIN_DB_PORT',
	PLUGIN_DB_PASSWORD: 'PLUGIN_DB_PASSWORD',
	PLUGIN_RESTORE_DB_NAME: 'PLUGIN_RESTORE_DB_NAME',
}

beforeEach(() => {
	process.env = env
})

describe('Config', () => {
	it('must pass yc env vars', () => {
		const config = new Config()

		expect(config.yc).toEqual({
			apiKey: env.PLUGIN_YC_API_KEY,
			serviceAccountId: env.PLUGIN_YC_SERVICE_ACCOUNT_ID,
			keyId: env.PLUGIN_YC_KEY_ID,
			audience: 'https://iam.api.cloud.yandex.net/iam/v1/tokens',
		})
	})
	it('must pass db env vars', () => {
		const config = new Config()

		expect(config.db).toEqual({
			name: env.DRONE_SOURCE_BRANCH.toLowerCase(), // TODO mock
			clusterId: env.PLUGIN_DB_CLUSTER_ID,
			user: env.PLUGIN_DB_USER,
			host: env.PLUGIN_DB_HOST,
			port: env.PLUGIN_DB_PORT,
			password: env.PLUGIN_DB_PASSWORD,
			restore_db_name: env.PLUGIN_RESTORE_DB_NAME,
		})
	})
})
