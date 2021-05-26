import dotenv from 'dotenv';
dotenv.config();
import { createConnection } from 'typeorm';
import { createServer } from './server';

createConnection().then(() => {
  const app = createServer();

  app.listen(8080, () => {
    console.log('Server has started at http://localhost:8080');
  });
});
