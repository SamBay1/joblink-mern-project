import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 5000;
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';

// =================================================
//Routers
import jobRouter from './routes/jobRouter.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
// public
import {dirname} from 'path';
import {fileURLToPath} from 'url';
import path from 'path';
// Middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import {authenticateUser} from './middleware/authMiddleware.js';

// ==== cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.static(path.resolve(__dirname, './public')));
app.use(cookieParser());
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/v1/test', (req, res) => {
  res.json({msg: 'test route'});
});

app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/users', authenticateUser, userRouter);
app.use('/api/v1/auth', authRouter);

app.use('*', (req, res) => {
  res.status(404).json({msg: 'not found'});
});
app.use(errorHandlerMiddleware);
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log('Server is running on port .... ' + 5000);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}