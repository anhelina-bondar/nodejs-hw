// src/server.js

import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { connectMongoDB } from './db/connectMongoDB.js';

// import { Note } from './models/note.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import notesRouters from './routes/notesRoutes.js';
import { errors } from 'celebrate';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT ?? 3000;

/* Middleware та маршрути */

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(logger);

////
app.use(authRoutes);
app.use(notesRouters);
app.use(errors());
app.use(notFoundHandler);
app.use(errorHandler);

// підключення до MongoDB
await connectMongoDB();

// запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
