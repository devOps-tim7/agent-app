import express from "express";
import { createConnection } from "typeorm";
import ProductRoute from "./src/routes/Products";

createConnection().then(() => {
  const app = express();

  const PORT = 8080;

  app.use("/api/product", ProductRoute);

  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
  });
});
