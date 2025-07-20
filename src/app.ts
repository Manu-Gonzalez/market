import express from "express";
import router from "@products/routes";
import userRoutes from "./users/routes";
import { verifyToken } from "@auth/verificationToken";
import errorHandler from "./shared/middlewares/errorHandlers/errorHandler";
import notFoundHandler from "./shared/middlewares/errorHandlers/notFoundMiddleware";


const app = express() ;

app.use(express.json()) ;

app.use("/products", router) ;

//app.use("/", userRoutes) ;

app.use(notFoundHandler) ;

app.use(errorHandler) ; 

export default app ;
