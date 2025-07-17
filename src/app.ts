import express from "express";
import router from "@products/routes";

const app = express() ;

app.use(express.json()) ;

app.use("/products", router) ;

export default app ;
