/*
  Warnings:

  - You are about to drop the column `precioUnidad` on the `productos` table. All the data in the column will be lost.
  - Added the required column `precio_unidad` to the `Productos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `productos` DROP COLUMN `precioUnidad`,
    ADD COLUMN `precio_unidad` FLOAT NOT NULL;
