import { PrismaClient } from "../generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL || "file:./dev.db",
});

const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("Starting seed...");

    await prisma.movement.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();

    const admin = await prisma.user.create({
        data: {
            name: "Admin Master",
            email: "admin@system.com",
            password: "123456",
            role: "ADMIN",
        },
    });

    const admin2 = await prisma.user.create({
        data: {
            name: "System Admin",
            email: "system@inventory.com",
            password: "123456",
            role: "ADMIN",
        },
    });

    const user1 = await prisma.user.create({
        data: {
            name: "John Doe",
            email: "john@system.com",
            password: "123456",
            role: "USER",
        },
    });

    const user2 = await prisma.user.create({
        data: {
            name: "Maria Silva",
            email: "maria@system.com",
            password: "123456",
            role: "USER",
        },
    });

    const pvcPipe = await prisma.product.create({
        data: {
            name: "PVC Pipe 50mm",
            code: "PVC-001",
            quantity: 120,
            description: "PVC pipe for water systems",
            category: "Construction",
            location: "Warehouse A1",
            price: 12.5,
        },
    });

    const steelRod = await prisma.product.create({
        data: {
            name: "Steel Rod 10mm",
            code: "STEEL-001",
            quantity: 80,
            description: "High resistance steel rod",
            category: "Metal",
            location: "Warehouse B2",
            price: 25.0,
        },
    });

    const cementBag = await prisma.product.create({
        data: {
            name: "Cement Bag 50kg",
            code: "CEM-001",
            quantity: 200,
            description: "Portland cement",
            category: "Construction",
            location: "Warehouse A3",
            price: 32.0,
        },
    });

    const paintBucket = await prisma.product.create({
        data: {
            name: "White Paint 18L",
            code: "PNT-001",
            quantity: 40,
            description: "Interior wall paint",
            category: "Finishing",
            location: "Warehouse C1",
            price: 55.0,
        },
    });

    await prisma.movement.createMany({
        data: [
            {
                type: "IN",
                quantity: 50,
                userId: admin.id,
                productId: pvcPipe.id,
            },
            {
                type: "OUT",
                quantity: 10,
                userId: user1.id,
                productId: pvcPipe.id,
            },
            {
                type: "IN",
                quantity: 30,
                userId: admin2.id,
                productId: steelRod.id,
            },
            {
                type: "OUT",
                quantity: 5,
                userId: user2.id,
                productId: steelRod.id,
            },
            {
                type: "IN",
                quantity: 100,
                userId: admin.id,
                productId: cementBag.id,
            },
            {
                type: "OUT",
                quantity: 20,
                userId: user1.id,
                productId: cementBag.id,
            },
            {
                type: "IN",
                quantity: 40,
                userId: admin2.id,
                productId: paintBucket.id,
            },
        ],
    });

    console.log("Seed completed successfully!");
}

main()
    .catch((e) => {
        console.error("Seed error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });