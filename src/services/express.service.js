import express from "express";
import cors from "cors";
import fs from "fs";
import bodyParser from "body-parser";
import helmet from "helmet";
import path from 'path';


/*
  body-parser: Parse incoming request bodies in a middleware before your handlers, 
  available under the req.body property.
*/

// Get the directory of the current module (express.service.js)
const currentModuleDir = path.dirname(new URL(import.meta.url).pathname);

// Navigate to the parent directory and then to the routes directory
const parentDir = path.join(currentModuleDir, '../');
const routesDir = path.join(parentDir, 'routes/');

const routeFiles = fs
  .readdirSync(routesDir)
  .filter(
    (file) => file.endsWith(".js")
  );

let server;
let routes = [];

const expressService = {
  init: async () => {
    try {
      /*
        Loading routes automatically
      */
      for (const file of routeFiles) {
        const route = await import(`../routes/${file}`);
        const routeName = Object.keys(route)[0];
        routes.push(route[routeName]);
      }

      server = express();
      server.use(bodyParser.json());
      server.use(helmet());
      server.use(cors());

      server.use(routes);

      server.listen(process.env.SERVER_PORT);
      console.log("[EXPRESS] Express initialized");
    } catch (error) {
      console.log("[EXPRESS] Error during express service initialization");
      throw error;
    }
  },
};

export default expressService;