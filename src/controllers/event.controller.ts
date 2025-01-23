import { Router } from 'express';
import type { Request, Response } from 'express';
import prisma from '../config/database';

const router = Router();

// GET: Listar todos os eventos esportivos
router.get('/', (req: Request, res: Response) => {
    prisma.event.findMany()
        .then(events => res.json(events))
        .catch(() => res.status(500).json({ error: 'Erro ao buscar eventos' }));
});

// GET: Buscar evento por ID
router.get('/:id', (req: Request, res: Response) => {
    prisma.event.findUnique({
        where: { id: Number(req.params.id) }
    })
        .then(event => {
            if (!event) {
                return res.status(404).json({ error: 'Evento não encontrado' });
            }
            res.json(event);
        })
        .catch(() => res.status(500).json({ error: 'Erro ao buscar evento' }));
});

// POST: Criar evento
router.post('/', (req: Request, res: Response) => {
    const { name, date, location, teamId } = req.body;
    prisma.event.create({
        data: { name, date, location, teamId }
    })
        .then(event => res.status(201).json(event))
        .catch(() => res.status(500).json({ error: 'Erro ao criar evento' }));
});

// PUT: Atualizar evento
router.put('/:id', (req: Request, res: Response) => {
    const { name, date, location, teamId } = req.body;
    prisma.event.update({
        where: { id: Number(req.params.id) },
        data: { name, date, location, teamId }
    })
        .then(event => res.json(event))
        .catch(() => res.status(500).json({ error: 'Erro ao atualizar evento' }));
});

// DELETE: Remover evento
router.delete('/:id', (req: Request, res: Response) => {
    prisma.event.delete({
        where: { id: Number(req.params.id) }
    })
        .then(() => res.status(204).send())
        .catch(() => res.status(500).json({ error: 'Erro ao excluir evento' }));
});

export default router;
