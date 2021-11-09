module.exports = {
	...(process.env.NODE_ENV === 'prod' &&
	{
		type: 'postgres',
		//duoc cung cap san tu heroku
		url: process.env.DATABASE_URL,
		logging: true,
		synchronize: false,
		extra: {
			ssl: {
				rejectUnauthorized: false
			}
		},
		entities: ['**/*.entity.js'],
		ssl: true
	}),
	...(process.env.NODE_ENV === 'test' &&
	{
		type: 'sqlite',
		database: 'test.sqlite',
		synchronize: true,
		//in test env , test runer chi find trong src
		entities: ['**/*.entity.ts'],
	}),
	...(process.env.NODE_ENV === 'dev' &&
	{
		type: 'postgres',
		host: 'localhost',
		port: 5432,
		username: 'postgres',
		password: 'buihongthinh',
		database: 'didb',
		entities: ['**/*.entity.js'],
		synchronize: false,
	}),

	migrations: ["./dist/migration/*.js"],
	"cli": {
		"migrationsDir": "migration"
	},
}