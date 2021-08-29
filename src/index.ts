import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from 'dotenv';
import { Pool, QueryResult } from 'pg';

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

app.get('/', async (req, res) => {
  const quoteAmount = req.query['quantity'] as string || '10';
  const genre = req.query['genre'];

  let queryResult: QueryResult = {
    rows: [],
    command: '',
    rowCount: 0,
    oid: 0,
    fields: []
  };

  if (genre) {
    try {
      queryResult = await pool.query(
        'SELECT * FROM QUOTES WHERE QUOTE_GENRE = $1 ORDER BY RANDOM() LIMIT $2',
        [genre, parseInt(quoteAmount)]
      );  
    } catch (error) {
      console.error(error.message);
    }
  } else {
    try {
      queryResult = await pool.query(
        'SELECT * FROM QUOTES ORDER BY RANDOM() LIMIT $1',
        [parseInt(quoteAmount)]
      );  
    } catch (error) {
      console.error(error.message);
    }
    
  }

  res.status(200).send({
    queryResult: queryResult.rows
  });
});