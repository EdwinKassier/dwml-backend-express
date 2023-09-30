import { Router } from "express";

import indexController from "../controllers/index.controller.js";

const indexRoutes = Router();

indexRoutes.get("/", indexController.home);

indexRoutes.get("/process_request", indexController.initial);

export { indexRoutes };