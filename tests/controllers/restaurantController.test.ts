import request from 'supertest';
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import RestaurantController from '../../src/controllers/restaurantController';
import RestaurantService from '../../src/services/restaurantService';
import Boom from '@hapi/boom';
import Restaurant from '../../src/models/restaurantModel';

const app = express();
app.use(bodyParser.json());

jest.mock('../../src/services/restaurantService');

const restaurantServiceMock = new RestaurantService({} as any) as jest.Mocked<RestaurantService>;

const restaurantController = new RestaurantController(restaurantServiceMock);

app.get('/api/restaurants/:id', restaurantController.get.bind(restaurantController));
app.put('/api/restaurants/:id', restaurantController.update.bind(restaurantController));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (Boom.isBoom(err)) {
    return res.status(err.output.statusCode).json(err.output.payload);
  }
  res.status(500).json({ message: 'Internal Server Error' });
});

const mockRestaurant = {
  id: 1,
  restaurantName: 'Test Restaurant',
  googlePlaceID: 'test-google-place-id',
  address: 'Test Address',
  isActive: true,
  isDeleted: false,
} as Restaurant & { createdAt: Date; updatedAt: Date };

describe('RestaurantController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('get a restaurant by ID and return a 200 status', async () => {
    
    const id = 1;
    restaurantServiceMock.getRestaurant.mockResolvedValue(mockRestaurant);

    
    const response = await request(app)
      .get(`/api/restaurants/${id}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockRestaurant);
    expect(restaurantServiceMock.getRestaurant).toHaveBeenCalledWith(id);
  });

  it('return 404 if restaurant is not found', async () => {
    
    const id = 1;
    const notFoundError = Boom.notFound('Restaurant not found');
    restaurantServiceMock.getRestaurant.mockRejectedValue(notFoundError);
    
    const response = await request(app)
      .get(`/api/restaurants/${id}`);
    
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      statusCode: 404,
      error: 'Not Found',
      message: 'Restaurant not found',
    });
    expect(restaurantServiceMock.getRestaurant).toHaveBeenCalledWith(id);
  });

  it('update a restaurant by ID and return a 200 status', async () => {
    
    const id = 1;
    const updateData = {
      restaurantName: 'Updated Restaurant',
      googlePlaceID: 'updated-google-place-id',
      address: 'Updated Address',
      isActive: false,
      isDeleted: true,
    };
    const updatedDate = Object.assign({}, mockRestaurant, updateData);
    restaurantServiceMock.updateRestaurant.mockResolvedValue(updatedDate);
   
    const response = await request(app)
      .put(`/api/restaurants/${id}`)
      .send(updateData);
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ ...mockRestaurant, ...updateData });
    expect(restaurantServiceMock.updateRestaurant).toHaveBeenCalledWith(id, updateData);
  });

  it('return 404 if restaurant update fails', async () => {
    const id = 1;
    const updateData = {
      restaurantName: 'Updated Restaurant',
      googlePlaceID: 'updated-google-place-id',
      address: 'Updated Address',
      isActive: false,
      isDeleted: true,
    };
    const notFoundError = Boom.notFound('Restaurant not found');
    restaurantServiceMock.updateRestaurant.mockRejectedValue(notFoundError);

    const response = await request(app)
      .put(`/api/restaurants/${id}`)
      .send(updateData);
    
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      statusCode: 404,
      error: 'Not Found',
      message: 'Restaurant not found',
    });
    expect(restaurantServiceMock.updateRestaurant).toHaveBeenCalledWith(id, updateData);
  });
});
