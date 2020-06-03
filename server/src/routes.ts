import express from "express";

/** Router */
const routes = express.Router();

routes.get("/", (request, response) => {
  return response.json({ message: "Hello World" });
});

export default routes;
