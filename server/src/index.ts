/** Express */
import express, { response } from "express";
import routes from "./routes";
import path from "path";
import cors from "cors";

/** Porta */
const port: number = 3333;

/** Instancia o servidor */
const app = express();

/** Permite acesso externo à API */
app.use(cors());

/** Permite o uso de JSON pelo Express */
app.use(express.json());
app.use(routes);

/** Acesso às imagens na pasta Uploads*/
app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

/** Escuta na porta 3333 */
app.listen(port);
