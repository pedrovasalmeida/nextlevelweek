import { Request, Response, response } from "express";
import knex from "../database/connection";

class PointsController {
  /** Cadastro de ponto de coleta */
  async create(req: Request, res: Response) {
    const city: string = await req.body.city;
    const uf: string = await req.body.uf;

    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
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

    // Transação, impede que querys sejam executadas caso ocorra erro
    const trx = await knex.transaction();

    const insertedIds = await trx("points").insert(point);

    const point_id = insertedIds[0];

    const pointItems = items.map((item_id: number) => {
      return {
        item_id,
        point_id,
      };
    });

    await trx("point_items").insert(pointItems);

    await trx.commit();

    return res.json({
      id: point_id,
      ...point,
      items,
    });
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const point = await knex("points").where("id", id).first();

    if (!point) {
      return res.status(400).json({ erro: "Ponto de coleta não encontrado" });
    }

    const items = await knex("items")
      .join("point_items", "items.id", "=", "point_items.item_id")
      .where("point_items.point_id", id)
      .select("*");

    return res.json({ point, items });
  }

  async index(req: Request, res: Response) {
    const { city, uf, items } = req.query;

    const parsedItems = String(items)
      .split(",")
      .map((item) => Number(item.trim()));

    if (!city && !uf && !items) {
      const points = await knex("points").select("*");

      return res.json(points);
    }

    // apenas uf
    if (!city && !items) {
      const points = await knex("points")
        .join("point_items", "points.id", "=", "point_items.point_id")
        .where("uf", String(uf))
        .distinct()
        .select("points.*");

      return res.json(points);
    }

    // apenas city
    if (!uf && !items) {
      const points = await knex("points")
        .join("point_items", "points.id", "=", "point_items.point_id")
        .where("city", String(city))
        .distinct()
        .select("points.*");

      return res.json(points);
    }

    // apenas Items
    if (!city && !uf) {
      const points = await knex("points")
        .join("point_items", "points.id", "=", "point_items.point_id")
        .whereIn("point_items.item_id", parsedItems)
        .distinct()
        .select("points.*");

      return res.json(points);
    }

    // apenas UF e Items
    if (!city) {
      const points = await knex("points")
        .join("point_items", "points.id", "=", "point_items.point_id")
        .whereIn("point_items.item_id", parsedItems)
        .where("uf", String(uf))
        .distinct()
        .select("points.*");

      return res.json(points);
    }

    // apenas City e Items
    if (!uf) {
      const points = await knex("points")
        .join("point_items", "points.id", "=", "point_items.point_id")
        .whereIn("point_items.item_id", parsedItems)
        .where("city", String(city))
        .distinct()
        .select("points.*");

      return res.json(points);
    }

    // apenas City e UF
    if (!items) {
      const points = await knex("points")
        .join("point_items", "points.id", "=", "point_items.point_id")
        .where("city", String(city))
        .where("uf", String(uf))
        .distinct()
        .select("points.*");

      return res.json(points);
    }

    // seleção dos pontos
    const points = await knex("points")
      .join("point_items", "points.id", "=", "point_items.point_id")
      .whereIn("point_items.item_id", parsedItems)
      .where("city", String(city))
      .where("uf", String(uf))
      .distinct()
      .select("points.*");

    return res.json(points);
  }
}

export default PointsController;
