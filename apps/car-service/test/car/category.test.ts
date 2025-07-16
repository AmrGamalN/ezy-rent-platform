import request from 'supertest';
import { CategoryController } from '../../src/controller/car/category.controller';
import { CategoryService } from '../../src/service/car/category.service';
let controller: CategoryController;
let mockInstance;

describe('CategoryController', () => {
  beforeAll(() => {
    jest.restoreAllMocks();
    mockInstance = {
      create: jest.fn(),
      getAll: jest.fn(),
      getById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    jest.spyOn(CategoryService, 'getInstance').mockReturnValue(mockInstance);
    controller = CategoryController.getInstance();
    globalThis.app.post('/categories', controller.create.bind(controller));
    globalThis.app.get('/categories', controller.getAll.bind(controller));
    globalThis.app.get('/categories/:id', controller.getById.bind(controller));
    globalThis.app.put('/categories/:id', controller.update.bind(controller));
    globalThis.app.delete(
      '/categories/:id',
      controller.delete.bind(controller),
    );
  });

  describe('create category', () => {
    it('should return 201 when category is created successfully', async () => {
      mockInstance.create.mockResolvedValue({
        status: 201,
        message: 'Created',
        data: { name: 'SUV' },
      });
      const res = await request(globalThis.app)
        .post('/categories')
        .send({ name: 'SUV' });
      expect(res.status).toBe(201);
      expect(res.body).toEqual({
        status: 201,
        message: 'Created',
        data: { name: 'SUV' },
      });
    });

    it('should return 400 if bad request data is sent', async () => {
      mockInstance.create.mockResolvedValue({
        status: 400,
        message: 'Bad Request',
      });
      const res = await request(globalThis.app).post('/categories').send({});
      expect(res.status).toBe(400);
      expect(res.body).toEqual({ status: 400, message: 'Bad Request' });
    });

    it('should return 401 if user is not authenticated', async () => {
      mockInstance.create.mockResolvedValue({
        status: 401,
        message: 'Unauthorized',
      });
      const res = await request(globalThis.app)
        .post('/categories')
        .send({ name: 'SUV' });
      expect(res.status).toBe(401);
      expect(res.body).toEqual({ status: 401, message: 'Unauthorized' });
    });

    it('should return 409 if category already exists', async () => {
      mockInstance.create.mockResolvedValue({
        status: 409,
        message: 'Conflict',
      });
      const res = await request(globalThis.app)
        .post('/categories')
        .send({ name: 'SUV' });
      expect(res.status).toBe(409);
      expect(res.body).toEqual({ status: 409, message: 'Conflict' });
    });

    it('should return 500 when service throws error', async () => {
      mockInstance.create.mockRejectedValue(new Error('DB error'));
      const res = await request(globalThis.app)
        .post('/categories')
        .send({ name: 'SUV' });
      expect(res.status).toBe(500);
    });
  });

  describe('get all categories', () => {
    it('should return 200 with categories', async () => {
      mockInstance.getAll.mockResolvedValue({
        status: 200,
        data: [{ id: '1', name: 'SUV' }],
      });
      const res = await request(globalThis.app).get('/categories');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        status: 200,
        data: [{ id: '1', name: 'SUV' }],
      });
    });

    it('should return 500 when service throws error', async () => {
      mockInstance.getAll.mockRejectedValue(new Error('DB error'));
      const res = await request(globalThis.app).get('/categories');
      expect(res.status).toBe(500);
    });
  });

  describe('get category by id', () => {
    it('should return 200 when category is found', async () => {
      mockInstance.getById.mockResolvedValue({
        status: 200,
        data: { id: '1', name: 'SUV' },
      });
      const res = await request(globalThis.app).get('/categories/1');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ status: 200, data: { id: '1', name: 'SUV' } });
    });
    it('should return 404 when category is not found', async () => {
      mockInstance.getById.mockResolvedValue({
        status: 404,
        message: 'Not Found',
      });
      const res = await request(globalThis.app).get('/categories/999');
      expect(res.status).toBe(404);
      expect(res.body).toEqual({ status: 404, message: 'Not Found' });
    });
    it('should return 500 when service throws error', async () => {
      mockInstance.getById.mockRejectedValue(new Error('DB error'));
      const res = await request(globalThis.app).get('/categories/1');
      expect(res.status).toBe(500);
    });
  });

  describe('update category', () => {
    it('should return 200 when category is updated', async () => {
      mockInstance.update.mockResolvedValue({
        status: 200,
        message: 'Updated',
      });
      const res = await request(globalThis.app)
        .put('/categories/1')
        .send({ name: 'Sedan' });
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ status: 200, message: 'Updated' });
    });
    it('should return 400 if bad request data is sent', async () => {
      mockInstance.update.mockResolvedValue({
        status: 400,
        message: 'Bad Request',
      });
      const res = await request(globalThis.app).put('/categories/1').send({});
      expect(res.status).toBe(400);
      expect(res.body).toEqual({ status: 400, message: 'Bad Request' });
    });
    it('should return 404 when category is not found', async () => {
      mockInstance.update.mockResolvedValue({
        status: 404,
        message: 'Not Found',
      });
      const res = await request(globalThis.app)
        .put('/categories/999')
        .send({ name: 'Sedan' });
      expect(res.status).toBe(404);
      expect(res.body).toEqual({ status: 404, message: 'Not Found' });
    });
    it('should return 409 if category already exists', async () => {
      mockInstance.update.mockResolvedValue({
        status: 409,
        message: 'Conflict',
      });
      const res = await request(globalThis.app)
        .put('/categories/1')
        .send({ name: 'Sedan' });
      expect(res.status).toBe(409);
      expect(res.body).toEqual({ status: 409, message: 'Conflict' });
    });
    it('should return 500 when service throws error', async () => {
      mockInstance.update.mockRejectedValue(new Error('DB error'));
      const res = await request(globalThis.app)
        .put('/categories/1')
        .send({ name: 'Sedan' });
      expect(res.status).toBe(500);
    });
  });

  describe('delete category', () => {
    it('should return 200 when category is deleted', async () => {
      mockInstance.delete.mockResolvedValue({
        status: 200,
        message: 'Deleted',
      });
      const res = await request(globalThis.app).delete('/categories/1');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ status: 200, message: 'Deleted' });
    });
    it('should return 404 when category is not found', async () => {
      mockInstance.delete.mockResolvedValue({
        status: 404,
        message: 'Not Found',
      });
      const res = await request(globalThis.app).delete('/categories/999');
      expect(res.status).toBe(404);
      expect(res.body).toEqual({ status: 404, message: 'Not Found' });
    });
    it('should return 409 if category cannot be deleted due to conflict', async () => {
      mockInstance.delete.mockResolvedValue({
        status: 409,
        message: 'Conflict',
      });
      const res = await request(globalThis.app).delete('/categories/1');
      expect(res.status).toBe(409);
      expect(res.body).toEqual({ status: 409, message: 'Conflict' });
    });
    it('should return 500 when service throws error', async () => {
      mockInstance.delete.mockRejectedValue(new Error('DB error'));
      const res = await request(globalThis.app).delete('/categories/1');
      expect(res.status).toBe(500);
    });
  });
});
