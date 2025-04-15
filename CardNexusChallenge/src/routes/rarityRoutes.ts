import { Router } from "express";
import { RarityRepository } from "../DAL/rarityRepository";
import prisma from "../../prisma/prismaConnection";

const router = Router();

router.get("/", async (_req, res) => {
  const rarityRepo = new RarityRepository(prisma);

  const rar = await rarityRepo.findManySorted();
  res.json(rar);
});

export default router;
