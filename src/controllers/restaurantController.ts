import { Request, Response, NextFunction } from 'express';
import RestaurantService from '../services/restaurantService';
import RestaurantRepository from '../repositories/restaurantRepository';

export default class RestaurantController {
  private restaurantService: RestaurantService;

  constructor(restaurantService: RestaurantService) {
    this.restaurantService = restaurantService;
  }

  public async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);

      const restaurant = await this.restaurantService.getRestaurant(id);
      //TODO: Response RO to be implemented
      res.status(200).json(restaurant);
    } catch (err) {
      next(err);
    }
  }
  //TODO: DTO to be implemented with class-validator
  public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);      
      const { restaurantName, googlePlaceID, address, isActive, isDeleted } = req.body;
      
      const restaurant = await this.restaurantService.updateRestaurant(id, { restaurantName, googlePlaceID, address, isActive, isDeleted });
      //TODO: Response RO to be implemented
      res.status(200).json(restaurant);
    } catch (err) {
      next(err);
    }
  }
}

const restaurantRepository = new RestaurantRepository();
const restaurantService = new RestaurantService(restaurantRepository);
export const restaurantController = new RestaurantController(restaurantService);