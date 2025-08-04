/*
  Warnings:

  - The primary key for the `categorias` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_categoria` on the `categorias` table. All the data in the column will be lost.
  - You are about to drop the column `id_categoria` on the `productos` table. All the data in the column will be lost.
  - You are about to drop the column `precio_unidad` on the `productos` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `Categorias` table without a default value. This is not possible if the table is not empty.
  - Made the column `nombre` on table `categorias` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `categoriaId` to the `Productos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precioUnidad` to the `Productos` table without a default value. This is not possible if the table is not empty.
  - Made the column `nombre` on table `productos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `username` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `productos` DROP FOREIGN KEY `Productos_id_categoria_fkey`;

-- DropIndex
DROP INDEX `Productos_id_categoria_fkey` ON `productos`;

-- AlterTable
ALTER TABLE `categorias` DROP PRIMARY KEY,
    DROP COLUMN `id_categoria`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `nombre` VARCHAR(30) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `productos` DROP COLUMN `id_categoria`,
    DROP COLUMN `precio_unidad`,
    ADD COLUMN `categoriaId` INTEGER NOT NULL,
    ADD COLUMN `precioUnidad` FLOAT NOT NULL,
    MODIFY `nombre` VARCHAR(40) NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `username` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(191) NOT NULL,
    MODIFY `password` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `RefreshToken` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expiresAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `RefreshToken_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pedidos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clienteId` INTEGER NOT NULL,
    `estado` VARCHAR(30) NOT NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `total` FLOAT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PedidoProducto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pedidoId` INTEGER NOT NULL,
    `productoId` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Users_username_key` ON `Users`(`username`);

-- CreateIndex
CREATE UNIQUE INDEX `Users_email_key` ON `Users`(`email`);

-- AddForeignKey
ALTER TABLE `Productos` ADD CONSTRAINT `Productos_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `Categorias`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RefreshToken` ADD CONSTRAINT `RefreshToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pedidos` ADD CONSTRAINT `Pedidos_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PedidoProducto` ADD CONSTRAINT `PedidoProducto_pedidoId_fkey` FOREIGN KEY (`pedidoId`) REFERENCES `Pedidos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PedidoProducto` ADD CONSTRAINT `PedidoProducto_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `Productos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
