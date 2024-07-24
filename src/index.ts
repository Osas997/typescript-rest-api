import express from "express";
import cors from "cors";
import { errorMiddleware } from "./middleware/error-middleware";
import router from "./router/routes";

export const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use("/public", express.static("public"));
app.use(cors());
app.use("/api", router);

app.use(errorMiddleware);
app.listen(port, () => {
  console.log("Listening on port " + port);
});
