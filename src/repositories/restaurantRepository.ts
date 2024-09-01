import Restaurant from '../models/restaurantModel';

class RestaurantRepository {
  public async findById(id: number): Promise<Restaurant | null> {
    return Restaurant.findByPk(id);
  }

  public async update(id: number, data: { restaurantName?: string; googlePlaceID?: string; address?: string; isActive?: boolean; isDeleted?: boolean }): Promise<Restaurant | null> {
    const restaurant = await this.findById(id);
    if (!restaurant) {
      return null;
    }
    return restaurant.update(data);
  }
}

export default RestaurantRepository;
