import { env } from './env.js';
import { router } from './routes.js';
import express from 'express';

const app = express();

app.use(express.json());
app.use(router);

app.listen(env.PORT, () => {
	console.log(`API server listening on port ${env.PORT}`);
});
