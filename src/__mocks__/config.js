const Config = jest.fn().mockImplementation(() => ({
	yc: {
		apiKey: 'apiKey',
		serviceAccountId: 'serviceAccountId',
		keyId: 'keyId',
		audience: 'audience',
	},
	db: {
		clusterId: 'clusterId',
		db_owner: 'db_owner',
	},
}))

module.exports = Config
