import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index.js';
import pokemonRouter from './routes/pokemon.js';
import metamaskAuthRouter from './routes/metamask-auth.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv'
import cors from 'cors'
import connectToDatabase from './config/db.js';
import authMiddleware from './middlewares/authMiddleware.js'


dotenv.config()

connectToDatabase()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', metamaskAuthRouter);
app.use('/pokemon', authMiddleware, pokemonRouter);

export default app;
