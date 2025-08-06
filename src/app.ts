import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import { RegisterRoutes } from '../build/routes.ts';

const app = express();

app.use(cors({
  origin: ['http://localhost:4200']
}));

app.listen(3000);

app.use(express.json());
// log request details to the console
app.use(morgan('dev'));


RegisterRoutes(app);

app.use((req: express.Request, res: express.Response) => {
  res.status(404).send('Route not found');
});
