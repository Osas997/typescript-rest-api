import express from "express";
import cors from "cors";
import { publicRoute } from "./router/public-route";
import { errorMiddleware } from "./middleware/error-middleware";
import { expressjwt, type Request as JWTRequest } from "express-jwt";
import { isAdmin } from "./middleware/isadmin-middleware";

export const app = express();
const port = process.env.PORT || 8000;
const secret = process.env.SECRET_KEY;

app.use(express.json());
app.use(express.static("public"));
app.use(cors());
app.use("/api", publicRoute);

app.get(
  "/api/me",
  expressjwt({ secret: "eaeaea", algorithms: ["HS256"] }),
  isAdmin,
  (req: JWTRequest, res) => {
    res.send(req.auth);
  }
);

app.get("/", (req, res) => {
  res.send("Hello World! ppk");
});

app.use(errorMiddleware);

app.listen(port, () => {
  console.log("Listening on port 3000");
});
