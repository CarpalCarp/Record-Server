import cors from 'cors';
import morgan from 'morgan';
import express, {
  Response,
  Request,
  NextFunction,
} from 'express';
import { RegisterRoutes } from '../build/routes.ts';
import { ValidateError } from 'tsoa';
import path from 'path';
import { Server } from 'socket.io';
import http from 'http';
import swaggerUi from 'swagger-ui-express';
import swaggerData from '../build/swagger.json';

const BACKEND_PORT = 3000;
const FRONTEND_PORT = 4200;
const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: [`http://localhost:${FRONTEND_PORT}`, 'http://localhost'], // http://localhost:PORT is for local front end without nginx
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  credentials: true // Enable passing credentials (cookies, auth headers)
};

const io = new Server(server, {
  cors: corsOptions
});

io.on('connection', (socket) => {
  console.log('hello socket.io client connected', socket.id);
});

app.use(cors(corsOptions));

app.set('etag', false);
app.use(express.json()); // Enables JSON body parsing
app.use(morgan('dev')); // Log request details to the console

// Static files
app.use(express.static(path.join(__dirname, 'ui-files')));

app.use(
  '/docs',
  swaggerUi.serve,
  async (_req: Request, res: Response) => {
    return res.send(
      swaggerUi.generateHTML(swaggerData)
    );
  }
);

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

// start the HTTP server (so socket.io and express share the same server)
server.listen(BACKEND_PORT, () => {
  console.log(`Server is running on http://localhost:${BACKEND_PORT}`);
  console.log(`Swagger docs available at http://localhost:${BACKEND_PORT}/docs`);
});
