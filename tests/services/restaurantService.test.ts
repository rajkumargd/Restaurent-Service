import RestaurantService from '../../src/services/restaurantService';
import RestaurantRepository from '../../src/repositories/restaurantRepository';
import Boom from '@hapi/boom';
import Restaurant from '../../src/models/restaurantModel';

jest.mock('../../src/repositories/restaurantRepository');

const restaurantRepositoryMock = new RestaurantRepository() as jest.Mocked<RestaurantRepository>;
const restaurantService = new RestaurantService(restaurantRepositoryMock);

const mockRestaurant = {
  id: 1,
  restaurantName: 'Test Restaurant',
  googlePlaceID: 'test-google-place-id',
  address: 'Test Address',
  isActive: true,
  isDeleted: false,
} as unknown as Restaurant;

describe('RestaurantService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
 
  it('get a restaurant by ID', async () => {
    
    const id = 1;
    restaurantRepositoryMock.findById.mockResolvedValue(mockRestaurant);

    const result = await restaurantService.getRestaurant(id);

    
    expect(result).toEqual(mockRestaurant);
    expect(restaurantRepositoryMock.findById).toHaveBeenCalledWith(id);
  });

  it('throw an error if restaurant is not found', async () => {
   
    const id = 1;
    restaurantRepositoryMock.findById.mockResolvedValue(null);

    await expect(restaurantService.getRestaurant(id)).rejects.toThrow(Boom.notFound('Restaurant not found'));
    expect(restaurantRepositoryMock.findById).toHaveBeenCalledWith(id);
  });

  it('update a restaurant by ID', async () => {
    
    const id = 1;
    const updateData = {
      restaurantName: 'Updated Restaurant',
      googlePlaceID: 'updated-google-place-id',
      address: 'Updated Address',
      isActive: false,
      isDeleted: true,
    };
    const updatedDate = Object.assign({}, mockRestaurant, updateData);
    restaurantRepositoryMock.update.mockResolvedValue(updatedDate);

    const result = await restaurantService.updateRestaurant(id, updateData);

    
    expect(result).toEqual(updatedDate);
    expect(restaurantRepositoryMock.update).toHaveBeenCalledWith(id, updateData);
  });

  it('throw an error if restaurant update fails', async () => {
    
    const id = 1;
    const updateData = {
      restaurantName: 'Updated Restaurant',
      googlePlaceID: 'updated-google-place-id',
      address: 'Updated Address',
      isActive: false,
      isDeleted: true,
    };
    restaurantRepositoryMock.update.mockResolvedValue(null);

    await expect(restaurantService.updateRestaurant(id, updateData)).rejects.toThrow(Boom.notFound('Restaurant not found'));
    expect(restaurantRepositoryMock.update).toHaveBeenCalledWith(id, updateData);
  });
});
