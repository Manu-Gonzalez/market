import express from "express";
import router from "@products/routes";
import userRoutes from "./users/routes";
import { verifyToken } from "@auth/verificationToken";
import { errorHandler } from "./shared/middlewares/errorHandle";
const app = express() ;

app.use(express.json()) ;

app.use("/products", verifyToken, router) ;

app.use("/", userRoutes) ;

app.use(errorHandler) ; 

export default app ;
