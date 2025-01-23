import { Router } from 'express';
import type { Request, Response } from 'express';
import prisma from '../config/database';

const router = Router();

/**
 * @swagger
 * /players:
 *   get:
 *     summary: Lista todos os jogadores
 *     responses:
 *       200:
 *         description: Lista de jogadores
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
 *                   position:
 *                     type: string
 *                   teamId:
 *                     type: integer
 */

/**
 * @swagger
 * /players/{id}:
 *   get:
 *     summary: Busca um jogador por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do jogador
 *     responses:
 *       200:
 *         description: Dados do jogador
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 position:
 *                   type: string
 *                 teamId:
 *                   type: integer
 *       404:
 *         description: Jogador não encontrado
 */

/**
 * @swagger
 * /players:
 *   post:
 *     summary: Cria um novo jogador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               position:
 *                 type: string
 *               teamId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Jogador criado com sucesso
 */

/**
 * @swagger
 * /players/{id}:
 *   put:
 *     summary: Atualiza os dados de um jogador
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do jogador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               position:
 *                 type: string
 *               teamId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Jogador atualizado com sucesso
 */

/**
 * @swagger
 * /players/{id}:
 *   delete:
 *     summary: Remove um jogador
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do jogador
 *     responses:
 *       204:
 *         description: Jogador removido com sucesso
 *       404:
 *         description: Jogador não encontrado
 */

// GET: Listar todos os jogadores
router.get('/', (req: Request, res: Response) => {
    prisma.player.findMany()
        .then(players => res.json(players))
        .catch(() => res.status(500).json({ error: 'Erro ao buscar jogadores' }));
});

// GET: Buscar jogador por ID
router.get('/:id', (req: Request, res: Response) => {
    prisma.player.findUnique({
        where: { id: Number(req.params.id) }
    })
        .then(player => {
            if (!player) {
                return res.status(404).json({ error: 'Jogador não encontrado' });
            }
            res.json(player);
        })
        .catch(() => res.status(500).json({ error: 'Erro ao buscar jogador' }));
});

// POST: Criar jogador
router.post('/', (req: Request, res: Response) => {
    const { name, position, teamId } = req.body;
    prisma.player.create({
        data: { name, position, teamId }
    })
        .then(player => res.status(201).json(player))
        .catch(() => res.status(500).json({ error: 'Erro ao criar jogador' }));
});

// PUT: Atualizar jogador
router.put('/:id', (req: Request, res: Response) => {
    const { name, position, teamId } = req.body;
    prisma.player.update({
        where: { id: Number(req.params.id) },
        data: { name, position, teamId }
    })
        .then(player => res.json(player))
        .catch(() => res.status(500).json({ error: 'Erro ao atualizar jogador' }));
});

// DELETE: Remover jogador
router.delete('/:id', (req: Request, res: Response) => {
    prisma.player.delete({
        where: { id: Number(req.params.id) }
    })
        .then(() => res.status(204).send())
        .catch(() => res.status(500).json({ error: 'Erro ao excluir jogador' }));
});

export default router;