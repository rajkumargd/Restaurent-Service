import { Router } from 'express';
import { restaurantController } from '../controllers/restaurantController';

const restaurentRouter = Router();

restaurentRouter.get('/restaurants/:id', restaurantController.get.bind(restaurantController));
restaurentRouter.put('/restaurants/:id', restaurantController.update.bind(restaurantController));

export default restaurentRouter;
