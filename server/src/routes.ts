import express, { request, response } from "express";
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
      id: item.id,
      title: item.title,
      image_url: `http://localhost:3333/uploads/${item.image}`,
    };
  });

  return response.json(serializedItems);
});

/** Cadastro de ponto de coleta */
routes.post("/collect_points", async (request, response) => {
  const {
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
    items,
  } = request.body;

  // Transações, impedem que uma query seja executada em sequência,
  // caso ocorra erro com alguma outra query
  const trx = await knex.transaction();

  const insertedIds = await trx("collect_points").insert({
    image: "image-fake",
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
  });

  const point_id = insertedIds[0];

  const pointItems = items.map((item_id: Number) => {
    return {
      item_id,
      point_id: insertedIds[0],
    };
  });

  await trx("point_items").insert(pointItems);

  return response.json({ sucess: true });
});

export default routes;
