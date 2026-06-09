import { errorHandler } from '$middlewares/errorHandler.js';
import { router } from './routes/routes.js';
import express from 'express';

const PORT = 8000;

const app = express();

app.use(express.json());
app.use(router);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`API server listening on port ${PORT}`);
});
