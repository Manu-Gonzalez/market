import express from "express";
import router from "@products/routes";
import userRoutes from "./users/routes";
import { verifyToken } from "@auth/verificationToken";
import errorHandler from "./shared/middlewares/errorHandlers/errorHandler";
import notFoundHandler from "./shared/middlewares/errorHandlers/notFoundMiddleware";
import { refreshToken } from "@auth/refreshToken";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: "http://127.0.0.1:5500",
    credentials: true
}));

app.use(cookieParser());

app.use(express.json());

app.use("/", userRoutes);
app.post("/refresh", refreshToken);
app.use("/products", router);

app.use(notFoundHandler);
app.use(verifyToken);
app.use(refreshToken);


app.use(errorHandler);


export default app;
