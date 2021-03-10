import 'reflect-metadata';
import createConnection from '../database';
import express from 'express';
import { router } from './routes';
import cors from 'cors';
import morgan from 'morgan';

createConnection();
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(router);

export { app };