import request from 'supertest';
import { WishlistController } from '../../src/controller/car/wishlist.controller';
import { WishlistService } from '../../src/service/car/wishlist.service';
let controller: WishlistController;

describe('WishlistController', () => {
  let mockInstance;

  beforeAll(() => {
    jest.restoreAllMocks();
    mockInstance = {
      create: jest.fn(),
      get: jest.fn(),
      getAll: jest.fn(),
      delete: jest.fn(),
    };
    jest.spyOn(WishlistService, 'getInstance').mockReturnValue(mockInstance);
    controller = new WishlistController();
    globalThis.app.post('/wishlists', controller.create);
    globalThis.app.get('/wishlists/:id', controller.get);
    globalThis.app.get('/wishlists', controller.getAll);
    globalThis.app.delete('/wishlists', controller.delete);
  });

  describe('create wishlist', () => {
    it('should return 201 when wishlist is created successfully', async () => {
      mockInstance.create.mockResolvedValue({
        status: 201,
        message: 'Created',
        data: { carId: '1', userId: '2' },
      });
      const res = await request(globalThis.app)
        .post('/wishlists')
        .send({ carId: '1', userId: '2' });
      expect(res.status).toBe(201);
      expect(res.body).toEqual({
        status: 201,
        message: 'Created',
        data: { carId: '1', userId: '2' },
      });
    });
    it('should return 400 if bad request data is sent', async () => {
      mockInstance.create.mockResolvedValue({
        status: 400,
        message: 'Bad Request',
      });
      const res = await request(globalThis.app).post('/wishlists').send({});
      expect(res.status).toBe(400);
      expect(res.body).toEqual({ status: 400, message: 'Bad Request' });
    });
    it('should return 401 if user is not authenticated', async () => {
      mockInstance.create.mockResolvedValue({
        status: 401,
        message: 'Unauthorized',
      });
      const res = await request(globalThis.app)
        .post('/wishlists')
        .send({ carId: '1' });
      expect(res.status).toBe(401);
      expect(res.body).toEqual({ status: 401, message: 'Unauthorized' });
    });
    it('should return 409 if wishlist already exists', async () => {
      mockInstance.create.mockResolvedValue({
        status: 409,
        message: 'Conflict',
      });
      const res = await request(globalThis.app)
        .post('/wishlists')
        .send({ carId: '1', userId: '2' });
      expect(res.status).toBe(409);
      expect(res.body).toEqual({ status: 409, message: 'Conflict' });
    });
    it('should return 500 when service throws error', async () => {
      mockInstance.create.mockRejectedValue(new Error('DB error'));
      const res = await request(globalThis.app)
        .post('/wishlists')
        .send({ carId: '1', userId: '2' });
      expect(res.status).toBe(500);
    });
  });

  describe('get wishlist by id', () => {
    it('should return 200 when wishlist is found', async () => {
      mockInstance.get.mockResolvedValue({
        status: 200,
        data: { id: '1', carId: '1' },
      });
      const res = await request(globalThis.app).get('/wishlists/1');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ status: 200, data: { id: '1', carId: '1' } });
    });
    it('should return 404 when wishlist is not found', async () => {
      mockInstance.get.mockResolvedValue({ status: 404, message: 'Not Found' });
      const res = await request(globalThis.app).get('/wishlists/999');
      expect(res.status).toBe(404);
      expect(res.body).toEqual({ status: 404, message: 'Not Found' });
    });
    it('should return 500 when service throws error', async () => {
      mockInstance.get.mockRejectedValue(new Error('DB error'));
      const res = await request(globalThis.app).get('/wishlists/1');
      expect(res.status).toBe(500);
    });
  });

  describe('get all wishlists', () => {
    it('should return 200 with wishlists', async () => {
      mockInstance.getAll.mockResolvedValue({
        status: 200,
        data: [{ id: '1', carId: '1' }],
      });
      const res = await request(globalThis.app).get('/wishlists');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        status: 200,
        data: [{ id: '1', carId: '1' }],
      });
    });
    it('should return 500 when service throws error', async () => {
      mockInstance.getAll.mockRejectedValue(new Error('DB error'));
      const res = await request(globalThis.app).get('/wishlists');
      expect(res.status).toBe(500);
    });
  });

  describe('delete wishlist', () => {
    it('should return 200 when wishlist is deleted', async () => {
      mockInstance.delete.mockResolvedValue({
        status: 200,
        message: 'Deleted',
      });
      const res = await request(globalThis.app)
        .delete('/wishlists')
        .send({ id: '1' });
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ status: 200, message: 'Deleted' });
    });
    it('should return 404 when wishlist is not found', async () => {
      mockInstance.delete.mockResolvedValue({
        status: 404,
        message: 'Not Found',
      });
      const res = await request(globalThis.app)
        .delete('/wishlists')
        .send({ id: '999' });
      expect(res.status).toBe(404);
      expect(res.body).toEqual({ status: 404, message: 'Not Found' });
    });
    it('should return 409 if wishlist cannot be deleted due to conflict', async () => {
      mockInstance.delete.mockResolvedValue({
        status: 409,
        message: 'Conflict',
      });
      const res = await request(globalThis.app)
        .delete('/wishlists')
        .send({ id: '1' });
      expect(res.status).toBe(409);
      expect(res.body).toEqual({ status: 409, message: 'Conflict' });
    });
    it('should return 500 when service throws error', async () => {
      mockInstance.delete.mockRejectedValue(new Error('DB error'));
      const res = await request(globalThis.app)
        .delete('/wishlists')
        .send({ id: '1' });
      expect(res.status).toBe(500);
    });
  });
});
