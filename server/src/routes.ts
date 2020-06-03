import express, { request, response } from "express";

import CollectPointsController from "./controllers/collectPointsController";
import ItemsController from "./controllers/itemsController";

/** Router */
const routes = express.Router();

const collectPointsController = new CollectPointsController();
const itemsController = new ItemsController();

routes.get("/items", itemsController.index);
routes.get("/items/:id", itemsController.show);
routes.post("/items", itemsController.create);

routes.get("/collectpoints", collectPointsController.index);
routes.get("/collectpoints/:id", collectPointsController.show);
routes.post("/collectpoints", collectPointsController.create);

export default routes;
