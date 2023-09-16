import { Sequelize } from "sequelize";
import fs from "fs";
import path from 'path';

// Get the directory of the current module (express.service.js)
const currentModuleDir = path.dirname(new URL(import.meta.url).pathname);

// Navigate to the parent directory and then to the routes directory
const parentDir = path.join(currentModuleDir, '../');
const routesDir = path.join(parentDir, 'models/');

const modelFiles = fs
  .readdirSync(routesDir)
  .filter((file) => file.endsWith(".js"));

const sequelizeService = {
  init: async () => {
    try {
      let connection = new Sequelize("sqlite::memory:");

      /*
        Loading models automatically
      */

      for (const file of modelFiles) {
        const model = await import(`../models/${file}`);
        model.default.init(connection);
      }

      modelFiles.map(async (file) => {
        const model = await import(`../models/${file}`);
        model.default.associate && model.default.associate(connection.models);
      });

      connection
        .sync({ force: true })
        .then(() => {
          console.log("Tables created successfully");
        })
        .catch((error) => {
          console.error("Unable to create tables: ", error);
        });

      console.log("[SEQUELIZE] Database service initialized");
    } catch (error) {
      console.log("[SEQUELIZE] Error during database service initialization");
      throw error;
    }
  },
};

export default sequelizeService;
