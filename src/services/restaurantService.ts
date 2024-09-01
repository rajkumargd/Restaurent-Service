import RestaurantRepository from '../repositories/restaurantRepository';
import Boom from '@hapi/boom';

class RestaurantService {
  private restaurantRepository: RestaurantRepository;

  constructor(restaurantRepository: RestaurantRepository) {
    this.restaurantRepository = restaurantRepository;
  }
  
  public async getRestaurant(id: number) {
    const restaurant = await this.restaurantRepository.findById(id);
    if (!restaurant) {
      throw Boom.notFound('Restaurant not found');
    }
    return restaurant;
  }

  public async updateRestaurant(id: number, data: { restaurantName?: string; googlePlaceID?: string; address?: string; isActive?: boolean; isDeleted?: boolean }) {
    const updatedRestaurant = await this.restaurantRepository.update(id, data);
    if (!updatedRestaurant) {
      throw Boom.notFound('Restaurant not found');
    }
    return updatedRestaurant;
  }
}

export default RestaurantService;
