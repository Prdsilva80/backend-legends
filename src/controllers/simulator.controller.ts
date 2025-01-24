import { Router, Request, Response } from 'express';
import SimulatorService from '../services/simulator.service';

const router = Router();

/**
 * @swagger
 * /simulator/match:
 *   post:
 *     summary: Simula uma partida entre dois times.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               teamA:
 *                 type: string
 *                 description: Nome do time A.
 *               teamB:
 *                 type: string
 *                 description: Nome do time B.
 *     responses:
 *       200:
 *         description: Resultado da simulação.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 teamA:
 *                   type: string
 *                 teamB:
 *                   type: string
 *                 teamAScore:
 *                   type: integer
 *                 teamBScore:
 *                   type: integer
 *                 winner:
 *                   type: string
 */
router.post('/match', (req: Request, res: Response) => {
    const { teamA, teamB } = req.body;
    const result = SimulatorService.simulateMatch(teamA, teamB);
    res.json(result);
});

/**
 * @swagger
 * /simulator/player/{id}:
 *   get:
 *     summary: Gera estatísticas de um jogador.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do jogador.
 *     responses:
 *       200:
 *         description: Estatísticas do jogador.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 playerId:
 *                   type: integer
 *                 goals:
 *                   type: integer
 *                 assists:
 *                   type: integer
 *                 matchesPlayed:
 *                   type: integer
 */
router.get('/player/:id', (req: Request, res: Response) => {
    const playerId = Number(req.params.id);
    const stats = SimulatorService.generatePlayerStats(playerId);
    res.json(stats);
});

/**
 * @swagger
 * /simulator/team/{id}:
 *   get:
 *     summary: Gera estatísticas de um time.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do time.
 *     responses:
 *       200:
 *         description: Estatísticas do time.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 teamId:
 *                   type: integer
 *                 wins:
 *                   type: integer
 *                 losses:
 *                   type: integer
 *                 draws:
 *                   type: integer
 */
router.get('/team/:id', (req: Request, res: Response) => {
    const teamId = Number(req.params.id);
    const stats = SimulatorService.generateTeamStats(teamId);
    res.json(stats);
});

export default router;
