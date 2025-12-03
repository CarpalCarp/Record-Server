import cors from 'cors';
import morgan from 'morgan';
import express, {
  Response as ExResponse,
  Request as ExRequest,
  NextFunction,
} from "express";
import { RegisterRoutes } from '../build/routes.ts';
import { ValidateError } from 'tsoa';
import path from 'path';

const app = express();

app.use(cors({
  origin: ['http://localhost:4200']
}));

app.listen(3000);

app.set('etag', false);
app.use(express.json()); // Enables JSON body parsing
app.use(morgan('dev')); // Log request details to the console
// Static file
app.use(express.static(path.join(__dirname, 'ui-files')));

RegisterRoutes(app); // Used by tsoa

app.use(function notFoundHandler(_req, res: ExResponse) {
  res.status(404).send({
    message: "Not Found",
  });
});

app.use(function errorHandler(
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction
): ExResponse | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }

  next();
});
