module.exports = {
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'postgres',
	password: 'buihongthinh',
	database: 'didb',
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