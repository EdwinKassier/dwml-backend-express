import { Router } from "express";

import indexController from "../controllers/index.controller.js";

const indexRoutes = Router();

indexRoutes.get("/process_request", indexController.initial);

export { indexRoutes };