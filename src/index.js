const YC = require('./yc/api')
const DB = require('./db')
const Config = require('./config')

async function main() {
	const config = new Config()

	const yc = new YC()
	const db = new DB()

	await yc.login()

	const database = await yc.getDB(config.db.name)

	if (!database) {
		await yc.createDB(config.db.name)
		await db.backup()
		await db.restore()
		console.log('db created and restored!')
	}
}

main()
