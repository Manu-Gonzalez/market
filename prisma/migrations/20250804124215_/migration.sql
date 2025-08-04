/*
  Warnings:

  - You are about to drop the column `categoriaId` on the `productos` table. All the data in the column will be lost.
  - Added the required column `id_categoria` to the `Productos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `productos` DROP FOREIGN KEY `Productos_categoriaId_fkey`;

-- DropIndex
DROP INDEX `Productos_categoriaId_fkey` ON `productos`;

-- AlterTable
ALTER TABLE `productos` DROP COLUMN `categoriaId`,
    ADD COLUMN `id_categoria` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Productos` ADD CONSTRAINT `Productos_id_categoria_fkey` FOREIGN KEY (`id_categoria`) REFERENCES `Categorias`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
