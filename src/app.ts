import cors from 'cors';
import morgan from 'morgan';
import express, {
  Response,
  Request,
  NextFunction,
} from "express";
import { RegisterRoutes } from '../build/routes.ts';
import { ValidateError } from 'tsoa';
import path from 'path';
import { Server } from 'socket.io';
import http from 'http';
import swaggerUi from 'swagger-ui-express';
import swaggerData from '../build/swagger.json';

const app = express();
const PORT = 3000;

app.use(
  '/docs',
  swaggerUi.serve,
  async (_req: Request, res: Response) => {
    return res.send(
      swaggerUi.generateHTML(swaggerData)
    );
  }
);

// Register tsoa generated routes
RegisterRoutes(app);

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
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/docs`);
});

RegisterRoutes(app); // Used by tsoa

app.use(function notFoundHandler(_req, res: Response) {
  res.status(404).send({
    message: "Not Found",
  });
});

app.use(function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }
  if (err instanceof Error) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }

  next();
});
