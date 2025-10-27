import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
  process.env.MYSQLDB_DATABASE,
  "root",
  process.env.MYSQLDB_ROOT_PASSWORD,
  {
    host: process.env.MYSQLDB_HOST || "mysqldb",
    port: process.env.MYSQLDB_DOCKER_PORT || 3306,
    dialect: "mysql",
    logging: false,
  }
);

export default sequelize;
