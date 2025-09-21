import express from "express";
import cors from "cors";
import { ModuleLoader } from "@core/utils/ModuleLoader";

const app = express();

app.use(express.json());
const port = 3010;

app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running");
});

ModuleLoader.registerModules(app).then(() => {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}).catch((error) => {
  console.error("Erro ao inicializar servidor:", error);
});