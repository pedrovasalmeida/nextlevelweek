import express from "express";
import knex from "./database/connection";

/** Router */
const routes = express.Router();

/** Listagem de todos os itens */
routes.get("/items", async (request, response) => {
  // SELECT * FROM 'ITEMS'
  const items = await knex("items").select("*");

  /** Transformação dos dados */
  const serializedItems = items.map((item) => {
    return {
      title: item.title,
      image_url: `http://localhost:3333/uploads/${item.image}`,
    };
  });

  return response.json(serializedItems);
});

export default routes;
