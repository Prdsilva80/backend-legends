import { Router } from 'express';
import prisma from '../config/database';

const router = Router();

router.get('/', async (req, res) => {
    const players = await prisma.player.findMany();
    res.json(players);
});

router.post('/', async (req, res) => {
    const { name, position, teamId } = req.body;
    const player = await prisma.player.create({
        data: { name, position, teamId },
    });
    res.json(player);
});

export default router;
