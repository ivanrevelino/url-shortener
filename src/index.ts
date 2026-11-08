import express from "express";
import { errorHandler } from "./middlewares/error-handler.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import redirectRoutes from "./routes/redirect.routes.js";
import urlRoutes from "./routes/url.routes.js";

const app = express();
const port = Number(process.env.PORT ?? 3000);

app.use(express.json({ limit: "10kb" }));

app.get("/", (request, response) => {
  response.send("URL Shortener API");
});

app.use("/auth", authRoutes);
app.use("/urls", urlRoutes);
app.use("/", redirectRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});