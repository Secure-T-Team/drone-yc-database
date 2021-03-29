const exec = require('shelljs.exec')
const Config = require('./config')

// TODO tests
class DB {
	file = 'backup.tar'
	constructor() {
		this.config = new Config()
	}

	backup() {
		const command = [
			`PGPASSWORD="${this.config.db.password}"`,
			`pg_dump`,
			`-h ${this.config.db.host}`,
			`-p ${this.config.db.port}`,
			`-U ${this.config.db.user}`,
			`-F c`,
			`-b -v`,
			`-O`,
			`-f "${this.file}"`,
			`-d ${this.config.db.restore_db_name}`,
		].join(' ')
		console.log('start backup...')
		exec(command, { stdio: 'inherit' })
		console.log('backup ok')
	}

	restore() {
		const command = [
			`PGPASSWORD="${this.config.db.password}"`,
			`pg_restore`,
			`-h ${this.config.db.host}`,
			`-O`,
			`-p ${this.config.db.port}`,
			`-U ${this.config.db.user}`,
			`-d ${this.config.db.name}`,
			`-v "${this.file}"`,
		].join(' ')

		console.log('start restore...')
		exec(command, { stdio: 'inherit' })
		console.log('restore ok')
	}
}

module.exports = DB
