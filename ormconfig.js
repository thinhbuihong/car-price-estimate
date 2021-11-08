module.exports = {
	...(process.env.NODE_ENV === 'test' ?
		{
			type: 'sqlite',
			database: 'test.sqlite',
			synchronize: true,
		} : {
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			username: 'postgres',
			password: 'buihongthinh',
			database: 'didb',
			synchronize: false,
		}),
	//in test env , test runer chi find trong src
	entities: process.env.NODE_ENV === 'test'
		?
		['**/*.entity.ts'] :
		['**/*.entity.js']
	,
	migrations: ["./dist/migration/*.js"],
	"cli": {
		"migrationsDir": "migration"
	},
}