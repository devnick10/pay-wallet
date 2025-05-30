/*
  Warnings:

  - The values [Electrotics] on the enum `StoreCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StoreCategory_new" AS ENUM ('Food', 'Retail', 'Services', 'Grocery', 'Electronics', 'Other');
ALTER TABLE "Store" ALTER COLUMN "category" TYPE "StoreCategory_new" USING ("category"::text::"StoreCategory_new");
ALTER TYPE "StoreCategory" RENAME TO "StoreCategory_old";
ALTER TYPE "StoreCategory_new" RENAME TO "StoreCategory";
DROP TYPE "StoreCategory_old";
COMMIT;
