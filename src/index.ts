import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
const port = 3010;

app.use(cors());
app.get("/", (req, res) => {
  res.send("API is running");
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});