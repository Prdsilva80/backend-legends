import { Router } from 'express';
import prisma from '../config/database';

const router = Router();

router.get('/', async (req, res) => {
    const teams = await prisma.team.findMany();
    res.json(teams);
});

router.post('/', async (req, res) => {
    const { name, position, teamId } = req.body;
    const team = await prisma.team.create({
        data: { name, position, teamId },
    });
    res.json(team);
});

export default router;
