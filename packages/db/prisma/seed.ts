import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { execSync } from "child_process";

const prisma = new PrismaClient();

async function resetAndMigrateDatabase() {
  try {
    console.log("🧹 Resetting database...");

    await Promise.all([
      prisma.user.deleteMany(),
      prisma.merchant.deleteMany(),
      prisma.balance.deleteMany(),
      prisma.onRampTransaction.deleteMany(),
      prisma.payout.deleteMany(),
      prisma.p2PTransfer.deleteMany(),
      prisma.store.deleteMany(),
    ]);

    console.log("🔄 Applying migrations...");
    // Run migrations synchronously
    execSync("npx prisma migrate deploy", { stdio: "inherit" });

    console.log("✅ Database reset and migrations applied");
  } catch (error) {
    console.error("❌ Error resetting database:", error);
    throw error;
  }
}

async function createUsers() {
  try {
    const [alice, bob] = await Promise.all([
      prisma.user.create({
        data: {
          number: "1111111111",
          password: await bcrypt.hash("alice", 10),
          name: "alice",
          email: "alice@example.com",
          Balance: { create: { amount: 20000, locked: 0 } },
        },
      }),
      prisma.user.create({
        data: {
          number: "2222222222",
          password: await bcrypt.hash("bob", 10),
          name: "bob",
          email: "bob@example.com",
          Balance: { create: { amount: 2000, locked: 0 } },
        },
      }),
    ]);
    console.log("👥 Created users");
    return { alice, bob };
  } catch (error) {
    console.error("❌ Error creating users:", error);
    throw error;
  }
}

async function createMerchants() {
  try {
    const [merchant1] = await Promise.all([
      prisma.merchant.create({
        data: {
          email: "merchant1@example.com",
          name: "Merchant One",
          number: "3333333333",
          auth_type: "Google",
          Balance: { create: { amount: 5000, locked: 0 } },
          Store: {
            create: {
              name: "Merchant One Store",
              description: "Premium goods store",
              category: "Retail",
              logo: "https://example.com/logo1.png",
            },
          },
        },
      }),
    ]);
    console.log("🏪 Created merchants");
    return { merchant1 };
  } catch (error) {
    console.error("❌ Error creating merchants:", error);
    throw error;
  }
}

async function createP2PTransfers(
  users: { alice: any; bob: any },
  merchant1: any,
) {
  try {
    await prisma.p2PTransfer.createMany({
      data: [
        { amount: 1000, fromUserId: users.alice.id, toUserId: users.bob.id },
        { amount: 500, fromUserId: users.bob.id, toMerchantId: merchant1.id },
        {
          amount: 2000,
          fromUserId: users.alice.id,
          toMerchantId: merchant1.id,
        },
      ],
    });
    console.log("💸 Created P2P transfers");
  } catch (error) {
    console.error("❌ Error creating P2P transfers:", error);
    throw error;
  }
}

async function createOnRampTransactions(users: { alice: any }, merchant1: any) {
  try {
    await prisma.onRampTransaction.createMany({
      data: [
        {
          startTime: new Date(),
          status: "Success",
          amount: 5000,
          token: "token__1",
          provider: "ICICI Bank",
          userId: users.alice.id,
        },
        {
          startTime: new Date(),
          status: "Processing",
          amount: 3000,
          token: "token__2",
          provider: "HDFC Bank",
          userId: users.alice.id,
          merchantId: merchant1.id,
        },
      ],
    });
    console.log("🔄 Created on-ramp transactions");
  } catch (error) {
    console.error("❌ Error creating on-ramp transactions:", error);
    throw error;
  }
}

async function createPayouts(users: { alice: any }, merchant1: any) {
  try {
    await prisma.payout.createMany({
      data: [
        {
          status: "Success",
          token: "payout__1",
          provider: "PayPal",
          amount: 1000,
          startTime: new Date(),
          userId: users.alice.id,
        },
        {
          status: "Processing",
          token: "payout__2",
          provider: "Stripe",
          amount: 2000,
          startTime: new Date(),
          merchantId: merchant1.id,
        },
      ],
    });
    console.log("💰 Created payouts");
  } catch (error) {
    console.error("❌ Error creating payouts:", error);
    throw error;
  }
}

async function main() {
  try {
    // 1. Reset and migrate database
    await resetAndMigrateDatabase();

    // 2. Seed data
    console.log("🌱 Seeding database...");
    const users = await createUsers();
    const { merchant1 } = await createMerchants();

    await createP2PTransfers(users, merchant1);
    await createOnRampTransactions(users, merchant1);
    await createPayouts(users, merchant1);

    console.log("✅ Seed completed successfully!");
  } catch (error) {
    console.error("❌ Fatal error during seeding:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
