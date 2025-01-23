import { Router } from 'express';
import type { Request, Response } from 'express';
import prisma from '../config/database';

const router = Router();

/**
 * @swagger
 * /teams:
 *   get:
 *     summary: Lista todos os times
 *     responses:
 *       200:
 *         description: Lista de times
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
 *                   country:
 *                     type: string
 *                   players:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         name:
 *                           type: string
 *                         position:
 *                           type: string
 *                   events:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         name:
 *                           type: string
 *                         date:
 *                           type: string
 *                           format: date-time
 *                         location:
 *                           type: string
 */

/**
 * @swagger
 * /teams/{id}:
 *   get:
 *     summary: Busca um time por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do time
 *     responses:
 *       200:
 *         description: Dados do time
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 country:
 *                   type: string
 *                 players:
 *                   type: array
 *                   items:
 *                     type: object
 *                 events:
 *                   type: array
 *                   items:
 *                     type: object
 *       404:
 *         description: Time não encontrado
 */

/**
 * @swagger
 * /teams:
 *   post:
 *     summary: Cria um novo time
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               country:
 *                 type: string
 *               players:
 *                 type: array
 *                 items:
 *                   type: object
 *               events:
 *                 type: array
 *                 items:
 *                   type: object
 *     responses:
 *       201:
 *         description: Time criado com sucesso
 */

/**
 * @swagger
 * /teams/{id}:
 *   put:
 *     summary: Atualiza os dados de um time
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do time
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               country:
 *                 type: string
 *               players:
 *                 type: array
 *                 items:
 *                   type: object
 *               events:
 *                 type: array
 *                 items:
 *                   type: object
 *     responses:
 *       200:
 *         description: Time atualizado com sucesso
 */

/**
 * @swagger
 * /teams/{id}:
 *   delete:
 *     summary: Remove um time
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do time
 *     responses:
 *       204:
 *         description: Time removido com sucesso
 *       404:
 *         description: Time não encontrado
 */

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
router.get('/:id', (req: Request, res: Response) => {
    prisma.team.findUnique({
        where: { id: Number(req.params.id) },
        include: { players: true, events: true },
    })
        .then(team => {
            if (!team) {
                return res.status(404).json({ error: 'Time não encontrado' });
            }
            res.json(team);
        })
        .catch(() => res.status(500).json({ error: 'Erro ao buscar time' }));
});

// POST: Criar time
router.post('/', (req: Request, res: Response) => {
    const { name, country, players, events } = req.body;
    prisma.team.create({
        data: { name, country, players, events },
    })
        .then(team => res.status(201).json(team))
        .catch(() => res.status(500).json({ error: 'Erro ao criar time' }));
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