import { Sequelize } from "sequelize";

const DB_URL = process.env.DB_URL;

if (DB_URL === undefined) {
  console.error("cannot find DB_URL");
  process.exit(1);
}

const sequelize = new Sequelize(DB_URL);
export default sequelize;
