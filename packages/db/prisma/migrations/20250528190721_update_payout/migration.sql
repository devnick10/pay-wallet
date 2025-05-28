-- DropForeignKey
ALTER TABLE "Payout" DROP CONSTRAINT "Payout_userId_fkey";

-- AlterTable
ALTER TABLE "Payout" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Payout" ADD CONSTRAINT "Payout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
