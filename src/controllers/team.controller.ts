import { Router } from 'express';
import type { Request, Response } from 'express';
import prisma from '../config/database';

const router = Router();

// GET: Listar todos os times
router.get('/', async (req: Request, res: Response) => {
    try {
        const teams = await prisma.team.findMany({
            include: { players: true, events: true },
        });
        res.json(teams);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar times' });
    }
});

// GET: Buscar time por ID
router.get('/', (req: Request, res: Response) => {
    prisma.team.findMany()
        .then(teams => res.json(teams))
        .catch(() => res.status(500).json({ error: 'Erro ao buscar times' }));
});

// POST: Criar time
router.post('/', (req: Request, res: Response) => {
    const { name, country, players, events } = req.body;
    prisma.team.create({
        data: { name, country, players, events }
    })
        .then(player => res.status(201).json(player))
        .catch(() => res.status(500).json({ error: 'Erro ao criar jogador' }));
});

// PUT: Atualizar time
router.put('/:id', async (req: Request, res: Response) => {
    const { name, country, players, events } = req.body;

    try {
        const team = await prisma.team.update({
            where: { id: Number(req.params.id) },
            data: { name, country, players, events },
        });
        res.json(team);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar time' });
    }
});

// DELETE: Remover time
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        await prisma.team.delete({
            where: { id: Number(req.params.id) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir time' });
    }
});

export default router;
