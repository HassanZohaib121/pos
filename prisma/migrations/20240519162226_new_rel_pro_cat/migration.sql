/*
  Warnings:

  - You are about to drop the column `productId` on the `category` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `category` DROP FOREIGN KEY `Category_productId_fkey`;

-- AlterTable
ALTER TABLE `category` DROP COLUMN `productId`;

-- CreateTable
CREATE TABLE `ProductCategory` (
    `productId` VARCHAR(191) NOT NULL,
    `categoryId` INTEGER NOT NULL,

    PRIMARY KEY (`productId`, `categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductCategory` ADD CONSTRAINT `ProductCategory_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductCategory` ADD CONSTRAINT `ProductCategory_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
