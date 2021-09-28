import e from "express";
import { PrismaClient } from "@prisma/client";
import { Router } from "express-serve-static-core";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const router = e.Router();

// GERAR E HASH DE SENHA E COMPARAR
// const newPass = await bcrypt.hash(password, 10);
// const match = await bcrypt.compare(password, newPass);

router.post("/", async (req, res) => {
  const { address, password, ...rest } = req.body;

  const newPass = await bcrypt.hash(password, 10);

  const user = await prisma.users.create({
    data: {
      password: newPass,
      ...rest,
      address: {
        create: address,
      },
    },
    include: { address: true },
  });
  return res.json({ error: false, response: user });
});

router.get("/", async (req, res) => {
  const user = await prisma.users.findMany();
  return res.json({ error: false, response: user });
});

router.get("/find", async (req, res) => {
  const { address, ...rest } = req.body;

  const user = await prisma.users.findFirst({
    where: {},
  });
  return res.json({ error: false, response: user });
});

module.exports = (app: { use: (arg0: string, arg1: Router) => any }) =>
  app.use("/api/v1/users", router);
