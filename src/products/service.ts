import { prisma } from "@config/prisma";

export async function getAll() {
  return await prisma.productos.findMany({
    include: { categoria: true }
  });
}

export async function getById(id: number) {
  const producto = await prisma.productos.findUnique({
    where: { id },
    include: { categoria: true }
  });
  if (!producto) throw new Error("Producto no encontrado");
  return producto;
}

export async function create(data: { nombre: string; precio_unidad: number; id_categoria: number }) {
  return await prisma.productos.create({ data });
}

export async function update(id: number, data: { nombre?: string; precio_unidad?: number; id_categoria?: number }) {
  return await prisma.productos.update({
    where: { id },
    data
  });
}

export async function remove(id: number) {
  return await prisma.productos.delete({ where: { id } });
}
