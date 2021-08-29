import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from 'dotenv';

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

app.get('/', (_req, res) => {
  res.status(200).json({
    message: "Hello, World!"
  })
});