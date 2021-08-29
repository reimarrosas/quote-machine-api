import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from 'dotenv';
import { Pool } from 'pg';

config({
  path: `${__dirname}/../env/.env`
});

const app = express();

app.use(cors({
  origin: `${process.env['HOST']}`,
  optionsSuccessStatus: 200
}));

app.use(helmet());

const PORT: number = parseInt(process.env['PORT'] as string) || 5000;
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});

const pool: Pool = new Pool({
  user: process.env['PGUSER'],
  host: process.env['PGHOST'],
  database: process.env['PGDATABASE'],
  password: process.env['PGPASSWORD'],
  port: parseInt(process.env['PGPORT'] as string)
});