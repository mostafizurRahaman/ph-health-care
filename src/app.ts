import { userRoutes } from "./app/modules/Users/user.route";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookiesParser from "cookie-parser";
import notFound from "./app/middlewares/notFound";
const app: Application = express();

// Global Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookiesParser());

// Root Route **
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: `PH Health Care Server In Running 🥳`,
  });
});

//  user Routes **
app.use("/api/v1/user", userRoutes);

// Not Found Route **
app.use(notFound);

export default app;
