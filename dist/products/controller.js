"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../config/prisma");
class ProductController {
    getProducts = async (req, res, next) => {
        try {
            const products = await prisma_1.prisma.productos.findMany({ include: { categoria: true } });
            return res.status(200).json(products);
        }
        catch (err) {
            return next(err);
        }
    };
    getProductById = async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);
            const product = await prisma_1.prisma.productos.findFirst({ where: { id }, include: { categoria: true } });
            if (!product)
                return res.status(404).json({ message: 'Producto no encontrado' });
            return res.status(200).json(product);
        }
        catch (err) {
            return next(err);
        }
    };
    createProduct = async (req, res, next) => {
        try {
            const { nombre, precio_unidad, id_categoria } = req.body;
            const product = await prisma_1.prisma.productos.create({
                data: { nombre, precio_unidad, id_categoria },
            });
            return res.status(201).json(product);
        }
        catch (err) {
            return next(err);
        }
    };
    deleteProduct = async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);
            await prisma_1.prisma.productos.delete({ where: { id } });
            return res.status(204).send();
        }
        catch (err) {
            return next(err);
        }
    };
    putProduct = async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);
            const { nombre, precio_unidad, id_categoria } = req.body;
            const updated = await prisma_1.prisma.productos.update({
                where: { id },
                data: { nombre, precio_unidad, id_categoria },
            });
            return res.status(200).json(updated);
        }
        catch (err) {
            return next(err);
        }
    };
}
exports.default = ProductController;
