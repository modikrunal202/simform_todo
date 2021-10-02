import express from 'express';
// import * as flash from 'express-flash';
const app = express();
import { createConnection } from 'typeorm';
import passport from 'passport';
import { User } from './entities/User';
import { Routes } from './routes';
import { initializePassport, jwtInitializePassport, googlePassportInitialize } from './config/passport';
const main = async () => {
	try {
		await createConnection({
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			username: 'postgres',
			password: 'root',
			database: 'simform_todo',
			entities: [User ],
			synchronize: true,
		});
		console.log('Connected to Postgres');
		// app.use(flash())
		await initializePassport(passport)
		await jwtInitializePassport(passport)
		await googlePassportInitialize(passport)
        const routes = new Routes(passport);
		app.use(express.json());
        app.use(passport.initialize())
        app.use("/api", routes.path(passport))
		app.listen(8080, () => {
			console.log('Now running on port 8080');
		});
	} catch (error) {
		console.error(error);
		throw new Error('Unable to connect to db');
	}
};

main();
