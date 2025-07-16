import request from 'supertest';
import { CarController } from '../../src/controller/car/car.controller';
import { CarService } from '../../src/service/car/car.service';
let controller: CarController;

describe('CarController', () => {
  let mockInstance;

  beforeAll(() => {
    jest.restoreAllMocks();
    mockInstance = {
      create: jest.fn(),
      get: jest.fn(),
      count: jest.fn(),
      update: jest.fn(),
      uploadNewImages: jest.fn(),
      deleteImages: jest.fn(),
      delete: jest.fn(),
    };
    jest.spyOn(CarService, 'getInstance').mockReturnValue(mockInstance);
    controller = CarController.getInstance();
    globalThis.app.post('/cars', controller.create);
    globalThis.app.get('/cars/:id', controller.get);
    globalThis.app.get('/cars-count', controller.count);
    globalThis.app.put('/cars/:id', controller.update);
    globalThis.app.post('/cars/:id/images', controller.uploadNewImages);
    globalThis.app.delete('/cars/:id/images', controller.deleteImages);
    globalThis.app.delete('/cars/:id', controller.delete);
  });

  describe('create car', () => {
    it('should return 201 when car is created successfully', async () => {
      mockInstance.create.mockResolvedValue({
        status: 201,
        message: 'Created',
        data: { make: 'Toyota', model: 'Corolla' },
      });
      const res = await request(globalThis.app)
        .post('/cars')
        .send({ make: 'Toyota', model: 'Corolla' });
      expect(res.status).toBe(201);
      expect(res.body).toEqual({
        status: 201,
        message: 'Created',
        data: { make: 'Toyota', model: 'Corolla' },
      });
    });
    it('should return 400 if bad request data is sent', async () => {
      mockInstance.create.mockResolvedValue({
        status: 400,
        message: 'Bad Request',
      });
      const res = await request(globalThis.app).post('/cars').send({});
      expect(res.status).toBe(400);
      expect(res.body).toEqual({ status: 400, message: 'Bad Request' });
    });
    it('should return 401 if user is not authenticated', async () => {
      mockInstance.create.mockResolvedValue({
        status: 401,
        message: 'Unauthorized',
      });
      const res = await request(globalThis.app)
        .post('/cars')
        .send({ make: 'Toyota' });
      expect(res.status).toBe(401);
      expect(res.body).toEqual({ status: 401, message: 'Unauthorized' });
    });
    it('should return 500 when service throws error', async () => {
      mockInstance.create.mockRejectedValue(new Error('DB error'));
      const res = await request(globalThis.app)
        .post('/cars')
        .send({ make: 'Toyota' });
      expect(res.status).toBe(500);
    });
  });

  describe('get car', () => {
    it('should return 200 and car data when get is successful', async () => {
      mockInstance.get.mockResolvedValue({
        status: 200,
        data: { id: '1', make: 'Toyota' },
      });
      const res = await request(globalThis.app).get('/cars/1');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        status: 200,
        data: { id: '1', make: 'Toyota' },
      });
    });
    it('should return 404 when car is not found', async () => {
      mockInstance.get.mockResolvedValue({ status: 404, message: 'Not Found' });
      const res = await request(globalThis.app).get('/cars/999');
      expect(res.status).toBe(404);
      expect(res.body).toEqual({ status: 404, message: 'Not Found' });
    });
    it('should return 500 when service throws error', async () => {
      mockInstance.get.mockRejectedValue(new Error('DB error'));
      const res = await request(globalThis.app).get('/cars/1');
      expect(res.status).toBe(500);
    });
  });

  describe('count cars', () => {
    it('should return 200 with count', async () => {
      mockInstance.count.mockResolvedValue({ status: 200, count: 5 });
      const res = await request(globalThis.app).get('/cars-count');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ status: 200, count: 5 });
    });
    it('should return 500 when service throws error', async () => {
      mockInstance.count.mockRejectedValue(new Error('DB error'));
      const res = await request(globalThis.app).get('/cars-count');
      expect(res.status).toBe(500);
    });
  });

  describe('update car', () => {
    it('should return 200 when car is updated', async () => {
      mockInstance.update.mockResolvedValue({
        status: 200,
        message: 'Updated',
      });
      const res = await request(globalThis.app)
        .put('/cars/1')
        .send({ make: 'Nissan' });
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ status: 200, message: 'Updated' });
    });
    it('should return 404 when car is not found', async () => {
      mockInstance.update.mockResolvedValue({
        status: 404,
        message: 'Not Found',
      });
      const res = await request(globalThis.app)
        .put('/cars/999')
        .send({ make: 'Nissan' });
      expect(res.status).toBe(404);
      expect(res.body).toEqual({ status: 404, message: 'Not Found' });
    });
    it('should return 500 when service throws error', async () => {
      mockInstance.update.mockRejectedValue(new Error('DB error'));
      const res = await request(globalThis.app)
        .put('/cars/1')
        .send({ make: 'Nissan' });
      expect(res.status).toBe(500);
    });
  });

  describe('upload new images', () => {
    it('should return 200 when images are uploaded', async () => {
      mockInstance.uploadNewImages.mockResolvedValue({
        status: 200,
        message: 'Images uploaded',
      });
      const res = await request(globalThis.app).post('/cars/1/images');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ status: 200, message: 'Images uploaded' });
    });
    it('should return 404 when car is not found', async () => {
      mockInstance.uploadNewImages.mockResolvedValue({
        status: 404,
        message: 'Not Found',
      });
      const res = await request(globalThis.app).post('/cars/999/images');
      expect(res.status).toBe(404);
      expect(res.body).toEqual({ status: 404, message: 'Not Found' });
    });
    it('should return 500 when service throws error', async () => {
      mockInstance.uploadNewImages.mockRejectedValue(new Error('DB error'));
      const res = await request(globalThis.app).post('/cars/1/images');
      expect(res.status).toBe(500);
    });
  });

  describe('delete images', () => {
    it('should return 200 when images are deleted', async () => {
      mockInstance.deleteImages.mockResolvedValue({
        status: 200,
        message: 'Images deleted',
      });
      const res = await request(globalThis.app)
        .delete('/cars/1/images')
        .send({ keys: ['img1'] });
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ status: 200, message: 'Images deleted' });
    });
    it('should return 404 when car is not found', async () => {
      mockInstance.deleteImages.mockResolvedValue({
        status: 404,
        message: 'Not Found',
      });
      const res = await request(globalThis.app)
        .delete('/cars/999/images')
        .send({ keys: ['img1'] });
      expect(res.status).toBe(404);
      expect(res.body).toEqual({ status: 404, message: 'Not Found' });
    });
    it('should return 500 when service throws error', async () => {
      mockInstance.deleteImages.mockRejectedValue(new Error('DB error'));
      const res = await request(globalThis.app)
        .delete('/cars/1/images')
        .send({ keys: ['img1'] });
      expect(res.status).toBe(500);
    });
  });

  describe('delete car', () => {
    it('should return 200 when car is deleted', async () => {
      mockInstance.delete.mockResolvedValue({
        status: 200,
        message: 'Deleted',
      });
      const res = await request(globalThis.app).delete('/cars/1');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ status: 200, message: 'Deleted' });
    });
    it('should return 404 when car is not found', async () => {
      mockInstance.delete.mockResolvedValue({
        status: 404,
        message: 'Not Found',
      });
      const res = await request(globalThis.app).delete('/cars/999');
      expect(res.status).toBe(404);
      expect(res.body).toEqual({ status: 404, message: 'Not Found' });
    });
    it('should return 500 when service throws error', async () => {
      mockInstance.delete.mockRejectedValue(new Error('DB error'));
      const res = await request(globalThis.app).delete('/cars/1');
      expect(res.status).toBe(500);
    });
  });
});
