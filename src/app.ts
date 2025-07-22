import { Request, Response } from 'express';
const cors = require('cors');
import morgan from 'morgan';
import express from 'express';
import { router } from './routes/record_routes';

const app = express();

app.use(cors({
  origin: ['http://localhost:4200']
}));

app.listen(3000);

app.use(express.json());
// log request details to the console
app.use(morgan('dev'));

app.use('/app', router);

app.use((req: Request, res: Response) => {
  res.status(404).send('Route not found');
});
