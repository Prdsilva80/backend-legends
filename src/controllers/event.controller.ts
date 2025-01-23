import { Router } from 'express';
import type { Request, Response } from 'express';
import prisma from '../config/database';

const router = Router();

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Lista todos os eventos esportivos
 *     responses:
 *       200:
 *         description: Lista de eventos esportivos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date-time
 *                   location:
 *                     type: string
 *                   teamId:
 *                     type: integer
 */

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Busca um evento por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do evento
 *     responses:
 *       200:
 *         description: Dados do evento
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 date:
 *                   type: string
 *                   format: date-time
 *                 location:
 *                   type: string
 *                 teamId:
 *                   type: integer
 *       404:
 *         description: Evento não encontrado
 */

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Cria um novo evento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               location:
 *                 type: string
 *               teamId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Evento criado com sucesso
 */

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Atualiza os dados de um evento
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do evento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               location:
 *                 type: string
 *               teamId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Evento atualizado com sucesso
 */

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Remove um evento
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do evento
 *     responses:
 *       204:
 *         description: Evento removido com sucesso
 *       404:
 *         description: Evento não encontrado
 */

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