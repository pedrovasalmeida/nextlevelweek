/** Express */
import express from "express";

/** Porta */
const port: number = 3333;

/** Instancia o servidor */
const app = express();

app.use(express.json());

/** Rotas */

// Rota: Endereço completo da requisição
// Recurso: A entidade acessada do sistema. Ex: /users

// GET: Busca uma ou mais informações no banco;
// POST: Cria uma nova informação no banco;
// PUT: Atualiza uma informação no banco;
// DELETE: Apaga uma informação do banco;

// Request Params: parâmetros que vem na própria rota e que identificam
// um recurso;

// Query Params: parâmetros (geralmente) opcionais;

const users = ["Pedro", "teste"];

app.get("/users", (request, response) => {
  console.log("Lista de usuários:");

  return response.json(users);
});

app.get("/users/:id", (request, response) => {
  const id = Number(request.params.id);

  if (id >= users.length) return response.json({ erro: "ID não existente!" });

  const user = users[id];

  return response.json(user);
});

app.post("/users", (request, response) => {
  const user = {
    name: "Pedroa",
    email: "pedro@contato.com",
  };

  return response.json(user);
});

/** Escuta na porta 3333 */
app.listen(port);
