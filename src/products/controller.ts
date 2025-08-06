import { Request, Response } from "express";
import * as ProductosService from "./service";
import { ExpressFunction } from "src/shared/types/ExpressFunctionType";
import GenericError from "@utils/GenericError";

export default class ProductsController {
  public getAll: ExpressFunction = async (req, res, next) => {
    try {
      const productos = await ProductosService.getAll();
      res.json(productos);
    } catch (error: any) {
      next(new GenericError(error.message, 500));
    }
  }

  public getById: ExpressFunction = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const producto = await ProductosService.getById(id);
      res.json(producto);
    } catch (error: any) {
      next(new GenericError(error.message, 404));
    }
  }

  public create: ExpressFunction = async (req, res, next) => {
    try {
      const { nombre, precio_unidad, id_categoria } = req.body;
      const nuevoProducto = await ProductosService.create({ nombre, precio_unidad, id_categoria });
      res.status(201).json(nuevoProducto);
    } catch (error: any) {
      next(new GenericError(error.message, 400));
    }
  }

  public update: ExpressFunction = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const { nombre, precio_unidad, id_categoria } = req.body;
      const productoActualizado = await ProductosService.update(id, { nombre, precio_unidad, id_categoria });
      res.json(productoActualizado);
    } catch (error: any) {
      next(new GenericError(error.message, 400));
    }
  }

  public remove: ExpressFunction = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      await ProductosService.remove(id);
      res.json({ message: "Producto eliminado" });
    } catch (error: any) {
      next(new GenericError(error.message, 400));
    }
  }
}
