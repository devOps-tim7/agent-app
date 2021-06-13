import dotenv from 'dotenv';
dotenv.config();
import { createConnection } from 'typeorm';
import { createServer } from './server';

createConnection().then(async () => {
  const app = createServer();

  const port = process.env.PORT;

  app.listen(port, () => {
    console.log(`Server has started at http://localhost:${port}`);
  });
});
