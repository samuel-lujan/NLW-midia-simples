import 'reflect-metadata';
import "../database"
import express from 'express';
import { router } from './routes';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(router);

app.listen(3333, () => 
    console.log('foi')
);
