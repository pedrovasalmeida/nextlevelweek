/** Express */
import express from "express";

/** Porta */
const port: number = 3333;

/** Instancia o servidor */
const app = express();

const users = ["Pedro", "Henrique", "de", "Vasconcellos", "Almeida"];

/** Permite o uso de JSON pelo Express */
app.use(express.json());

app.get("/users", (request, response) => {
  return response.json(users);
});

app.get("/users/:id", (request, response) => {
  const id = Number(request.params.id);

  if (id > users.length - 1)
    return response.json({
      error: `ID não existe. O último ID é ${users.length - 1}`,
    });

  const user = users[id];

  return response.json(user);
});

/** Escuta na porta 3333 */
app.listen(port);
