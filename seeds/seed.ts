import { PrismaClient } from "../generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL || "file:./dev.db",
});

export const prisma = new PrismaClient({ adapter });

async function main() {

  const admin = await prisma.user.create({
    data: {
      name: "Admin Master",
      email: "admin@system.com",
      password: "123456",
      role: "ADMIN",
    },
  });

  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john@system.com",
      password: "123456",
      role: "ADMIN",
    },
  });

  const product1 = await prisma.product.create({
    data: {
      name: "PVC Pipe",
      code: "PVC-001",
      quantity: 100,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: "Steel Rod",
      code: "STEEL-001",
      quantity: 50,
    },
  });

  await prisma.movement.create({
    data: {
      type: "IN",
      quantity: 20,
      userId: admin.id,
      productId: product1.id,
    },
  });

  await prisma.movement.create({
    data: {
      type: "OUT",
      quantity: 5,
      userId: user.id,
      productId: product2.id,
    },
  });

}

await prisma.user.create({
    data: {
        name: "Administrator",
        email: "admin@inventory.com",
        password: "123456",
        role: "ADMIN"
    }
});

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });