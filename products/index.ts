import dotenv from 'dotenv';
dotenv.config();
import { createConnection } from 'typeorm';
import { createServer } from './server';
import UserService from './src/services/UserService';
var cloudinary = require('cloudinary').v2;

createConnection().then(async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });
  const app = createServer();

  if (!(await UserService.findByUsername('admin'))) {
    await UserService.create('admin', 'admin');
  }

  const port = process.env.PORT || 8081;

  app.listen(port, () => {
    console.log(`Server has started at http://localhost:${port}`);
  });
});
