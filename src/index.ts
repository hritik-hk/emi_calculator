import "dotenv/config";
import express from "express";

import emiRouter from "./routes/emi.routes.js";
import sequelize from "./config/database.config.js";

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());

app.use("/api/emi", emiRouter);

sequelize
  .sync()
  .then(() => {
    console.log("connected to database");
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to  database:", error);
  });
