import dotenv from 'dotenv';
dotenv.config();
import { createConnection } from 'typeorm';
import { createServer } from './server';
import UserService from './src/services/UserService';

createConnection().then(async () => {
  const app = createServer();

  if (!(await UserService.findByUsername('admin'))) {
    await UserService.create('admin', 'admin');
  }

  app.listen(8080, () => {
    console.log('Server has started at http://localhost:8080');
  });
});
