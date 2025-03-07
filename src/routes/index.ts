import { Router } from 'express';
import playerController from '../controllers/player.controller';
import teamController from '../controllers/team.controller';
import eventController from '../controllers/event.controller';
import ApiFutebolController from '../controllers/apiFutebol.controller';
import simulatorRoutes from '../controllers/simulator.controller';

const router = Router();

router.use('/players', playerController);
router.use('/teams', teamController);
router.use('/events', eventController);
router.use('/futebol', ApiFutebolController);
router.use('/simulator', simulatorRoutes);

export default router;
