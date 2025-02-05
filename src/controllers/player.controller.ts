import { Router, Request, Response, NextFunction } from 'express';
import { body, param, validationResult } from 'express-validator';
import prisma from '../config/database';
import logger from '../config/logger';

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

// Middleware para validar erros de entrada
const validate = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.error(`Erro de validação: ${JSON.stringify(errors.array())}`);
        res.status(400).json({ errors: errors.array() });
        return;
    }
    next();
};

router.use((req: Request, res: Response, next: NextFunction): void => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const players = await prisma.player.findMany();
        res.json(players);
    } catch (error) {
        logger.error('Erro ao buscar jogadores:', error);
        res.status(500).json({ error: 'Erro ao buscar jogadores' });
    }
});

router.get(
    '/:id',
    [param('id').isInt().withMessage('O ID deve ser um número inteiro')],
    validate,
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const player = await prisma.player.findUnique({
                where: { id: Number(req.params.id) },
            });
            if (!player) {
                res.status(404).json({ error: 'Jogador não encontrado' });
                return;
            }
            res.json(player);
        } catch (error) {
            logger.error('Erro ao buscar jogador:', error);
            res.status(500).json({ error: 'Erro ao buscar jogador' });
        }
    }
);

router.post(
    '/',
    [
        body('name').isString().trim().notEmpty().withMessage('Nome é obrigatório'),
        body('position').isString().trim().notEmpty().withMessage('Posição é obrigatória'),
        body('teamId').isInt().withMessage('teamId deve ser um número inteiro'),
    ],
    validate,
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { name, position, teamId } = req.body;
            const player = await prisma.player.create({
                data: { name, position, teamId },
            });
            res.status(201).json(player);
        } catch (error) {
            logger.error('Erro ao criar jogador:', error);
            res.status(500).json({ error: 'Erro ao criar jogador' });
        }
    }
);

router.put(
    '/:id',
    [
        param('id').isInt().withMessage('O ID deve ser um número inteiro'),
        body('name').optional().isString().trim(),
        body('position').optional().isString().trim(),
        body('teamId').optional().isInt(),
    ],
    validate,
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { name, position, teamId } = req.body;
            const updateData: any = {};

            if (name) updateData.name = name;
            if (position) updateData.position = position;
            if (teamId) updateData.teamId = teamId;

            const player = await prisma.player.update({
                where: { id: Number(req.params.id) },
                data: updateData,
            });

            res.json(player);
        } catch (error) {
            logger.error('Erro ao atualizar jogador:', error);
            res.status(500).json({ error: 'Erro ao atualizar jogador' });
        }
    }
);

router.delete(
    '/:id',
    [param('id').isInt().withMessage('O ID deve ser um número inteiro')],
    validate,
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const player = await prisma.player.findUnique({
                where: { id: Number(req.params.id) },
            });

            if (!player) {
                res.status(404).json({ error: 'Jogador não encontrado' });
                return;
            }

            await prisma.player.delete({
                where: { id: Number(req.params.id) },
            });

            res.status(204).send();
        } catch (error) {
            logger.error('Erro ao excluir jogador:', error);
            res.status(500).json({ error: 'Erro ao excluir jogador' });
        }
    }
);

export default router;