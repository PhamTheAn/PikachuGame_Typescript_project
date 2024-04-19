import { Router } from 'express';
import GameController from '../controllers/gameController';
import gameController from '../controllers/gameController';
const router = Router()

router.get('/', GameController.main)
router.post('/', GameController.handleEnterName)

export default router