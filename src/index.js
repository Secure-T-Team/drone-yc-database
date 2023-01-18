const YC = require('./yc/api')
const DB = require('./db')
const Config = require('./config')
const test_str = '-test'

async function main() {
	const config = new Config()

	const yc = new YC()
	const db = new DB()

	await yc.login()

	const database = await yc.getDB(config.db.name)
    const test_database = database.concat('-test')
    console.log(test_database)

	if (!database) {
		await yc.createDB(config.db.name)
		db.backup()
		db.restore()
		console.log('db created and restored!')
	}
}

main()
