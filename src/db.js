const { exec } = require('child_process')
const Config = require('./config')

// TODO tests
class DB {
	file = 'backup.tar'
	constructor() {
		this.config = new Config()
	}

	backup() {
		const command = [
			`pg_dump`,
			`-h ${this.config.db.host}`,
			`-p ${this.config.db.port}`,
			`-U ${this.config.db.user}`,
			`-W ${this.config.db.password}`,
			`-F c -b -v`,
			`-f "${this.file}"`,
			`${this.config.db.restore_db_name}`,
		].join(' ')
		console.log('start backup...')
		exec(command, { stdio: 'inherit' })
		console.log('backup ok')
	}

	restore() {
		const command = [
			`pg_restore`,
			`-h ${this.config.db.host}`,
			`-p ${this.config.db.port}`,
			`-U ${this.config.db.user}`,
			`-W ${this.config.db.password}`,
			`-d ${this.config.db.name}`,
			`-v "${this.file}"`,
		].join(' ')

		console.log('start restore...')
		exec(command, { stdio: 'inherit' })
		console.log('restore ok')
	}
}

module.exports = DB
