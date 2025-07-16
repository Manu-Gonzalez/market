import { Request, Response } from 'express';
import Product  from './model';

let products: Product[] = [
  { id: 1, nombre: 'Producto 1', precio: 10, id_categoria: 1},
  { id: 2, nombre: 'Producto 2', precio: 20, id_categoria: 1 },
];

export default class ProductController {
  public getProducts(req: Request, res: Response): void {
    res.json(products) ;
  }

  public getProductById(req: Request, res: Response): void {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    if (product) {
      res.json(product) ;
    } else {
      res.status(404).send('Producto no encontrado') ;
    }
  }

  public createProduct(req: Request, res: Response): void {
    const newProduct: Product = {
      id: products.length + 1,
      nombre: req.body.nombre,
      precio: req.body.precio,
      id_categoria: req.body.id_categoria,
    };
    products.push(newProduct);
    res.status(201).json(newProduct) ;
  }

  
}