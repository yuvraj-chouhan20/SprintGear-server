import { glob } from "glob";
import { Sequelize } from "sequelize";
import path from "path";

const sequelizeConnection = new Sequelize("sprintgear", "yuvraj", "groot", {
  dialect: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 5432),
});

interface ModelDictionary {
  [key: string]: any;
}

const databaseConnection = async (): Promise<Sequelize> => {
  try {
    await sequelizeConnection.authenticate();
    console.log("Database connection has been established successfully.");

    let db: ModelDictionary = {};
    const modules = "../app/modules";
    const schemaFiles = glob.sync(path.join(__dirname, modules, "**/Model.ts"));

    schemaFiles.forEach((schema: string) => {
      const models = require(schema).default;
      db = { ...db, ...models };
    });

    Object.keys(db).forEach((modelName: string) => {
      if (modelName && db[modelName] && typeof db[modelName].associate === "function") {
        db[modelName].associate(db);
      }
    });
    return sequelizeConnection;
  } catch (error) {
    console.error("Error connecting to database:", error);
    return sequelizeConnection
  }
};

sequelizeConnection.sync();
export default sequelizeConnection;
export { databaseConnection };
