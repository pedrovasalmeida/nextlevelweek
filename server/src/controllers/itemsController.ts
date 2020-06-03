import { Request, Response } from "express";
import knex from "../database/connection";

class ItemsController {
  async index(req: Request, res: Response) {
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

    return res.json(serializedItems);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const items = await knex("items").where("id", id).first();

    if (!items) {
      return res.status(400).json({ erro: "Item não existente!" });
    }
    return res.json(items);
  }

  async create(req: Request, res: Response) {
    const { title, image } = await req.body;

    const trx = await knex.transaction();

    const item = { title, image };

    const insertedId = await trx("items").insert(item);
    const id = insertedId[0];

    await trx.commit();

    return res.json({
      id,
      ...item,
    });
  }
}

export default ItemsController;
