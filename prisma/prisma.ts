import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { PrismaClient } from "../app/generated/prisma/client.js";
import { withAccelerate } from '@prisma/extension-accelerate'

const adapter = new PrismaLibSQL({
  url: `${process.env.TURSO_DATABASE_URL}`,
  authToken: `${process.env.TURSO_AUTH_TOKEN}`,
})

const globalForPrisma = global as unknown as { 
    prisma: PrismaClient
}

const prisma = globalForPrisma.prisma || new PrismaClient({ adapter }).$extends(withAccelerate())

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
