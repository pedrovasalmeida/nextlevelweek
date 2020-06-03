import express, { request, response } from "express";

import PointsController from "./controllers/pointsController";
import ItemsController from "./controllers/itemsController";

/** Router */
const routes = express.Router();

const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get("/items", itemsController.index);
routes.get("/items/:id", itemsController.show);
routes.post("/items", itemsController.create);

routes.get("/points", pointsController.index);
routes.get("/points/:id", pointsController.show);
routes.post("/points", pointsController.create);

export default routes;
