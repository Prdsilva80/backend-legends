import { Router } from 'express';
import playerController from '../controllers/player.controller';
import teamController from '../controllers/team.controller';
import eventController from '../controllers/event.controller';

const router = Router();

router.use('/players', playerController);
router.use('/teams', teamController);
router.use('/events', eventController);

export default router;
