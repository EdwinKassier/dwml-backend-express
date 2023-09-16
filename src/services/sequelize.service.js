import { Sequelize } from "sequelize";
import databaseConfig from "../config/database";
import fs from "fs";

const modelFiles = fs
  .readdirSync(__dirname + "/../models/")
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
