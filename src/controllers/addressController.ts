import express from "express";
import { PrismaClient } from "@prisma/client";
import { Router } from "express-serve-static-core";

const prisma = new PrismaClient();

const router = express.Router();

router.get("/", async (req, res) => {
  const address = await prisma.address.findMany();
  return res.json({ error: false, response: address });
});

router.get("/find", async (req, res) => {
  const where = req.body.where;
  const address = await prisma.address.findFirst({
    where: where,
  });
  return res.json({ error: false, response: address });
});

module.exports = (app: { use: (arg0: string, arg1: Router) => any }) =>
  app.use("/api/v1/address", router);
