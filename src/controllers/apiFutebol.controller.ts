import { Router } from 'express';
import ApiFutebolService from '../services/apiFutebol.service';

const router = Router();

router.get('/competitions', async (req, res) => {
    try {
        const competitions = await ApiFutebolService.getCompetitions();
        res.json(competitions);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unexpected error';
        res.status(500).json({ error: errorMessage });
    }
});

router.get('/competitions/:id', async (req, res) => {
    try {
        const competitionId = Number(req.params.id);
        const competition = await ApiFutebolService.getCompetitionById(competitionId);
        res.json(competition);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unexpected error';
        res.status(500).json({ error: errorMessage });
    }
});

router.get('/competitions/:id/teams', async (req, res) => {
    try {
        const competitionId = Number(req.params.id);
        const teams = await ApiFutebolService.getTeams(competitionId);
        res.json(teams);
    } catch (error: any) {
        console.error('Error in controller:', error.message);
        const errorMessage = error.response?.data || error.message || 'Unexpected error';
        res.status(500).json({ error: errorMessage });
    }
});

router.get('/competitions/:id/matches', async (req, res) => {
    try {
        const competitionId = Number(req.params.id);
        const matches = await ApiFutebolService.getMatches(competitionId);
        res.json(matches);
    } catch (error: any) {
        console.error('Error in controller:', error.message);
        const errorMessage = error.response?.data || error.message || 'Unexpected error';
        res.status(500).json({ error: errorMessage });
    }
});

export default router;
