const YC = require('./yc/api')
const DB = require('./db')
const Config = require('./config')
const test_str = '-test'

async function main() {
	const config = new Config()

	const yc = new YC()
	const db = new DB()
    const database_name = config.db.name

	await yc.login()

    if (Boolean(config.is_test_db)) {
        const test_database_name = database_name.concat('-test')
        console.log(test_database)
        const test_database = await yc.createDB(test_database_name)
    }

    else {
        const database = await yc.getDB(database_name)
        if (!database) {
            await yc.createDB(config.db.name)
            db.backup()
            db.restore()
            console.log('db created and restored!')
        }
    }
}

main()
