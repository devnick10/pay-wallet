-- CreateTable
CREATE TABLE "Otp" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "otp" INTEGER NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Otp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Otp_number_key" ON "Otp"("number");
