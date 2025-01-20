import { Router } from 'express';
import prisma from '../config/database';

const router = Router();

router.get('/', async (req, res) => {
    const events = await prisma.event.findMany();
    res.json(events);
});

router.post('/', async (req, res) => {
    const { name, position, teamId } = req.body;
    const event = await prisma.event.create({
        data: { name, position, teamId },
    });
    res.json(event);
});

export default router;
