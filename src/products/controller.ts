import { NextFunction, Request, Response } from 'express';
import { prisma } from '../config/prisma';

interface Product {
  nombre: string;
  precio_unidad: number;
  id_categoria: number;
}

type ControllerFunctions = (req: Request, res: Response, next: NextFunction) => void

export default class ProductController {
  public  getProducts : ControllerFunctions = async (req, res, next) => {
    try {
      const products = await prisma.productos.findMany({include: { categoria: true }});
      return res.status(200).json(products);
    } catch (err) {
      return next(err);
    }
  }

  public getProductById : ControllerFunctions = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const product = await prisma.productos.findFirst({ where: { id }, include: { categoria: true }});

      if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

      return res.status(200).json(product);
    } catch (err) {
      return next(err);
    }
  }

  public createProduct : ControllerFunctions = async (req, res, next) => {
    try {
      const { nombre, precio_unidad, id_categoria }: Product = req.body;

      const product = await prisma.productos.create({
        data: { nombre, precio_unidad, id_categoria },
      });

      return res.status(201).json(product);
    } catch (err) {
      return next(err);
    }
  }

  public deleteProduct : ControllerFunctions = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);

      await prisma.productos.delete({ where: { id } });

      return res.status(204).send();
    } catch (err) {
      return next(err);
    }
  }

  public putProduct : ControllerFunctions = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const { nombre, precio_unidad, id_categoria }: Product = req.body;

      const updated = await prisma.productos.update({
        where: { id },
        data: { nombre, precio_unidad, id_categoria },
      });

      return res.status(200).json(updated);
    } catch (err) {
      return next(err);
    }
  }
}
