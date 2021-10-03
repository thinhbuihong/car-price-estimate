module.exports = {
	type: 'sqlite',
	database: 'db.sqlite',
	entities: process.env.NODE_ENV === 'development'
		?
		['**/*.entity.js'] :
		['**/*.entity.ts']
	,
	migrations: ["./dist/migration/*.js"],
	"cli": {
		"migrationsDir": "migration"
	},
	synchronize: false,
}