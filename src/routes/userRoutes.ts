import { Router } from 'express';
import { createUser, listUsers, getQueueStatus } from '../controllers/UserController';

const router = Router();

router.post('/', createUser);
router.get('/', listUsers);
router.get('/queue/status', getQueueStatus);

export default router;