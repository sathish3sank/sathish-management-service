import "reflect-metadata";
import { initializeConnection } from "./connections/connect";
import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as S from "./routes/students";

const port = 3000;
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: "application/*+json" }));
app.use("/api/student", S.student);

app.listen(port, () => {
  initializeConnection()
    .then((_) => console.log("Connection established."))
    .catch(console.error);
});
