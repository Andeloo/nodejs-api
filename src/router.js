import Express from 'express';
import HealthcheckController from './controllers/HealthcheckController';
import RegisterController from './controllers/RegisterController';
import WorkloadController from './controllers/reports/WorkloadController';

const router = Express.Router();

router.use('/', HealthcheckController);
router.use('/', RegisterController);
router.use('/reports/', WorkloadController);


export default router;
