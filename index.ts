import { createConnection } from 'typeorm';
import { createServer } from './server';

createConnection().then(() => {
  const app = createServer();

  app.listen(8000, () => {
    console.log('Server has started!');
  });
});
