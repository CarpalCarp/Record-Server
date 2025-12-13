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
import { Server } from 'socket.io';
import http from 'http';

const app = express();

app.use(cors({
  origin: ['http://localhost:4200']
}));

// create a single HTTP server and attach socket.io to it
const server = http.createServer(app);

app.set('etag', false);
app.use(express.json()); // Enables JSON body parsing
app.use(morgan('dev')); // Log request details to the console

// Static files
app.use(express.static(path.join(__dirname, 'ui-files')));

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:4200'],
  },
});

io.on('connection', (socket) => {
  console.log('hello socket.io client connected', socket.id);
});

RegisterRoutes(app); // Used by tsoa

// start the HTTP server (so socket.io and express share the same server)
server.listen(3000);

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
