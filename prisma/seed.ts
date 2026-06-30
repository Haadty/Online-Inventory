import "dotenv/config";

import { PrismaClient } from "../generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL,
});

export const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("Starting Seed");

    await prisma.movement.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();

    const admin = await prisma.user.create({
        data: {
            name: "IT Director",
            email: "director@it.local",
            password: "123456",
            role: "ADMIN",
        },
    });

    const infraAdmin = await prisma.user.create({
        data: {
            name: "Infrastructure Admin",
            email: "infra@it.local",
            password: "123456",
            role: "ADMIN",
        },
    });

    const secAdmin = await prisma.user.create({
        data: {
            name: "Security Admin",
            email: "security@it.local",
            password: "123456",
            role: "ADMIN",
        },
    });

    const tech1 = await prisma.user.create({
        data: {
            name: "Carlos Technician",
            email: "carlos@it.local",
            password: "123456",
            role: "USER",
        },
    });

    const tech2 = await prisma.user.create({
        data: {
            name: "Maria Support",
            email: "maria@it.local",
            password: "123456",
            role: "USER",
        },
    });

    const tech3 = await prisma.user.create({
        data: {
            name: "Lucas Field Tech",
            email: "lucas@it.local",
            password: "123456",
            role: "USER",
        },
    });

    const intern = await prisma.user.create({
        data: {
            name: "Ana Intern",
            email: "ana@it.local",
            password: "123456",
            role: "USER",
        },
    });

    const laptop = await prisma.product.create({
        data: {
            name: "Dell Latitude 5420",
            code: "LAP-001",
            quantity: 30,
            description: "Corporate laptop i7 16GB RAM",
            category: "Hardware",
            location: "IT Storage Room A",
            price: 5200,
        },
    });

    const laptop2 = await prisma.product.create({
        data: {
            name: "Lenovo ThinkPad T14",
            code: "LAP-002",
            quantity: 18,
            description: "Business laptop AMD Ryzen 7",
            category: "Hardware",
            location: "IT Storage Room A",
            price: 4800,
        },
    });

    const monitor = await prisma.product.create({
        data: {
            name: "Monitor 24 IPS LG",
            code: "MON-001",
            quantity: 55,
            description: "Full HD IPS monitor",
            category: "Hardware",
            location: "IT Storage Room B",
            price: 950,
        },
    });

    const keyboard = await prisma.product.create({
        data: {
            name: "Mechanical Keyboard RGB",
            code: "KEY-001",
            quantity: 80,
            description: "Mechanical gaming/office keyboard",
            category: "Peripheral",
            location: "IT Storage Room B",
            price: 320,
        },
    });

    const mouse = await prisma.product.create({
        data: {
            name: "Wireless Mouse Logitech",
            code: "MOU-001",
            quantity: 120,
            description: "Wireless ergonomic mouse",
            category: "Peripheral",
            location: "IT Storage Room B",
            price: 180,
        },
    });

    const router = await prisma.product.create({
        data: {
            name: "TP-Link Enterprise Router",
            code: "NET-001",
            quantity: 20,
            description: "High performance network router",
            category: "Network",
            location: "Server Room",
            price: 850,
        },
    });

    const switchDevice = await prisma.product.create({
        data: {
            name: "Cisco Switch 24 Ports",
            code: "NET-002",
            quantity: 12,
            description: "Enterprise network switch",
            category: "Network",
            location: "Server Room",
            price: 2400,
        },
    });

    const headset = await prisma.product.create({
        data: {
            name: "Headset Logitech H390",
            code: "AUD-001",
            quantity: 70,
            description: "USB headset for support team",
            category: "Audio",
            location: "IT Storage Room C",
            price: 220,
        },
    });

    await prisma.movement.createMany({
        data: [
            {
                type: "IN",
                quantity: 15,
                reason: "New laptop batch received from supplier",
                adminId: admin.id,
                recipientId: null,
                productId: laptop.id,
            },
            {
                type: "IN",
                quantity: 10,
                reason: "ThinkPads replenishment",
                adminId: infraAdmin.id,
                recipientId: null,
                productId: laptop2.id,
            },
            {
                type: "IN",
                quantity: 20,
                reason: "Monitors new shipment",
                adminId: infraAdmin.id,
                recipientId: null,
                productId: monitor.id,
            },

            {
                type: "OUT",
                quantity: 2,
                reason: "Assigned to development team",
                adminId: admin.id,
                recipientId: tech1.id,
                productId: laptop.id,
            },
            {
                type: "OUT",
                quantity: 1,
                reason: "Field work assignment",
                adminId: infraAdmin.id,
                recipientId: tech3.id,
                productId: laptop2.id,
            },
            {
                type: "OUT",
                quantity: 3,
                reason: "Support team deployment",
                adminId: admin.id,
                recipientId: tech2.id,
                productId: monitor.id,
            },

            {
                type: "OUT",
                quantity: 5,
                reason: "New hires onboarding kit",
                adminId: infraAdmin.id,
                recipientId: intern.id,
                productId: keyboard.id,
            },
            {
                type: "OUT",
                quantity: 10,
                reason: "Mouse distribution for office staff",
                adminId: admin.id,
                recipientId: null,
                productId: mouse.id,
            },

            {
                type: "OUT",
                quantity: 2,
                reason: "Network expansion project",
                adminId: secAdmin.id,
                recipientId: tech3.id,
                productId: router.id,
            },
            {
                type: "IN",
                quantity: 4,
                reason: "Switch replacement stock",
                adminId: secAdmin.id,
                recipientId: null,
                productId: switchDevice.id,
            },

            {
                type: "OUT",
                quantity: 8,
                reason: "Call center expansion",
                adminId: infraAdmin.id,
                recipientId: tech2.id,
                productId: headset.id,
            },

            {
                type: "ADJUST",
                quantity: -1,
                reason: "Defective unit removed from inventory",
                adminId: admin.id,
                recipientId: null,
                productId: laptop.id,
            },
            {
                type: "ADJUST",
                quantity: 3,
                reason: "Inventory correction after audit",
                adminId: secAdmin.id,
                recipientId: null,
                productId: monitor.id,
            },
        ],
    });

    console.log("Seed completed");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });