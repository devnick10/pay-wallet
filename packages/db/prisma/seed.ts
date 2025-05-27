import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function createUsers() {
  const alice = await prisma.user.upsert({
    where: { number: '1111111111' },
    update: {},
    create: {
      number: '1111111111',
      password: await bcrypt.hash('alice', 10),
      name: 'alice',
      Balance: {
        create: {
          amount: 20000,
          locked: 0
        }
      }
    }
  });

  const bob = await prisma.user.upsert({
    where: { number: '2222222222' },
    update: {},
    create: {
      number: '2222222222',
      password: await bcrypt.hash('bob', 10),
      name: 'bob',
      Balance: {
        create: {
          amount: 2000,
          locked: 0
        }
      }
    }
  });

  return { alice, bob };
}

async function createMerchants() {
  const merchant = await prisma.merchant.upsert({
    where: { email: 'merchant@example.com' },
    update: {},
    create: {
      email: 'merchant@example.com',
      name: 'Merchant One',
      auth_type: 'Google',
      Balance: {
        create: {
          amount: 5000,
          locked: 0
        }
      }
    }
  });

  return merchant;
}

async function createOnRampTransactions(userId: number, merchantId: number) {
  await prisma.onRampTransaction.create({
    data: {
      startTime: new Date(),
      status: 'Success',
      amount: 5000,
      token: 'token__3',
      provider: 'ICICI Bank',
      userId: userId,
      merchantId: merchantId
    }
  });
}

async function main() {
  const { alice } = await createUsers();
  const merchant = await createMerchants();
  await createOnRampTransactions(alice.id, merchant.id);
  console.log('Seed completed.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
