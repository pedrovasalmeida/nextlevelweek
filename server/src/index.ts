/** Express */
import express, { response } from "express";
import routes from "./routes";

/** Porta */
const port: number = 3333;

/** Instancia o servidor */
const app = express();

/** Permite o uso de JSON pelo Express */
app.use(express.json());
app.use(routes);

/** Escuta na porta 3333 */
app.listen(port);
