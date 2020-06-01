/** Express */
import express from "express";

/** Porta */
const port: number = 3333;

/** Instancia o servidor */
const app = express();

/** Rotas */
app.get("/users", (request, response) => {
  console.log("Lista de usuários:");

  return response.json([
    "Pedro",
    "Henrique",
    "de",
    "Vasconcellos",
    "Almeida",
    ";",
  ]);
});

/** Escuta na porta 3333 */
app.listen(port);
