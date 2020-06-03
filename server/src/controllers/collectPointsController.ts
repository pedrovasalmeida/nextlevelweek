import { Request, Response, response } from "express";
import knex from "../database/connection";

class CollectPointsController {
  /** Cadastro de ponto de coleta */
  async create(req: Request, res: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = await req.body;

    const point = {
      image: "teste.svg",
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };

    // // Transação, impede que querys sejam executadas caso ocorra erro
    // const trx = await knex.transaction();

    const insertedIds = await knex("collect_points").insert(point);

    const point_id = insertedIds[0];

    const pointItems = items.map((item_id: number) => {
      return {
        item_id,
        point_id,
      };
    });

    await knex("point_items").insert(pointItems);

    return res.json({
      id: point_id,
      ...point,
      items,
    });
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const point = await knex("collect_points").where("id", id).first();

    if (!point) {
      return res.status(400).json({ erro: "Ponto de coleta não encontrado" });
    }
    return res.json(point);
  }

  async index(req: Request, res: Response) {
    const points = await knex("collect_points").select("*");

    const serializedPoints = points.map((point) => {
      return {
        id: point.id,
        linkImage: point.image,
        Nome: point.name,
        Email: point.email,
        WhatsApp: point.whatsapp,
        Latitude: point.name,
        Longitude: point.longitude,
        City: point.city,
        UF: point.uf,
      };
    });

    return res.json(serializedPoints);
  }
}

export default CollectPointsController;
