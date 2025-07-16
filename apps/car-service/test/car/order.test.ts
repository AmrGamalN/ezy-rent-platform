import request from 'supertest';
import { OrderController } from '../../src/controller/car/order.controller';
import { OrderService } from '../../src/service/car/order.service';
let controller: OrderController;

describe('OrderController', () => {
  let mockInstance;
  beforeAll(() => {
    jest.restoreAllMocks();
    mockInstance = {
      create: jest.fn(),
      getAll: jest.fn(),
      getById: jest.fn(),
      updateStatus: jest.fn(),
      count: jest.fn(),
      delete: jest.fn(),
    };
    jest.spyOn(OrderService, 'getInstance').mockReturnValue(mockInstance);
    controller = new OrderController();
    globalThis.app.post('/orders', controller.create);
    globalThis.app.get('/orders', controller.getAll);
    globalThis.app.get('/orders/:id', controller.getById);
    globalThis.app.patch('/orders/:id/status', controller.updateStatus);
    globalThis.app.get('/orders-count', controller.count);
    globalThis.app.delete('/orders/:id', controller.delete);
  });

  describe('create order', () => {
    it('should return 201 when order is created successfully', async () => {
      mockInstance.create.mockResolvedValue({
        status: 201,
        message: 'Created',
        data: { carId: '1', userId: '2' },
      });
      const res = await request(globalThis.app)
        .post('/orders')
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
      const res = await request(globalThis.app).post('/orders').send({});
      expect(res.status).toBe(400);
      expect(res.body).toEqual({ status: 400, message: 'Bad Request' });
    });
    it('should return 401 if user is not authenticated', async () => {
      mockInstance.create.mockResolvedValue({
        status: 401,
        message: 'Unauthorized',
      });
      const res = await request(globalThis.app)
        .post('/orders')
        .send({ carId: '1' });
      expect(res.status).toBe(401);
      expect(res.body).toEqual({ status: 401, message: 'Unauthorized' });
    });
    it('should return 409 if order already exists', async () => {
      mockInstance.create.mockResolvedValue({
        status: 409,
        message: 'Conflict',
      });
      const res = await request(globalThis.app)
        .post('/orders')
        .send({ carId: '1', userId: '2' });
      expect(res.status).toBe(409);
      expect(res.body).toEqual({ status: 409, message: 'Conflict' });
    });
    it('should return 500 when service throws error', async () => {
      mockInstance.create.mockRejectedValue(new Error('DB error'));
      const res = await request(globalThis.app)
        .post('/orders')
        .send({ carId: '1', userId: '2' });
      expect(res.status).toBe(500);
    });
  });

  describe('get all orders', () => {
    it('should return 200 with orders', async () => {
      mockInstance.getAll.mockResolvedValue({
        status: 200,
        data: [{ id: '1', carId: '1' }],
      });
      const res = await request(globalThis.app).get('/orders');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        status: 200,
        data: [{ id: '1', carId: '1' }],
      });
    });
    it('should return 500 when service throws error', async () => {
      mockInstance.getAll.mockRejectedValue(new Error('DB error'));
      const res = await request(globalThis.app).get('/orders');
      expect(res.status).toBe(500);
    });
  });

  describe('get order by id', () => {
    it('should return 200 when order is found', async () => {
      mockInstance.getById.mockResolvedValue({
        status: 200,
        data: { id: '1', carId: '1' },
      });
      const res = await request(globalThis.app).get('/orders/1');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ status: 200, data: { id: '1', carId: '1' } });
    });
    it('should return 404 when order is not found', async () => {
      mockInstance.getById.mockResolvedValue({
        status: 404,
        message: 'Not Found',
      });
      const res = await request(globalThis.app).get('/orders/999');
      expect(res.status).toBe(404);
      expect(res.body).toEqual({ status: 404, message: 'Not Found' });
    });
    it('should return 500 when service throws error', async () => {
      mockInstance.getById.mockRejectedValue(new Error('DB error'));
      const res = await request(globalThis.app).get('/orders/1');
      expect(res.status).toBe(500);
    });
  });

  describe('update order status', () => {
    it('should return 200 when order status is updated', async () => {
      mockInstance.updateStatus.mockResolvedValue({
        status: 200,
        message: 'Updated',
      });
      const res = await request(globalThis.app)
        .patch('/orders/1/status')
        .send({ status: 'completed' });
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ status: 200, message: 'Updated' });
    });
    it('should return 400 if bad request data is sent', async () => {
      mockInstance.updateStatus.mockResolvedValue({
        status: 400,
        message: 'Bad Request',
      });
      const res = await request(globalThis.app)
        .patch('/orders/1/status')
        .send({});
      expect(res.status).toBe(400);
      expect(res.body).toEqual({ status: 400, message: 'Bad Request' });
    });
    it('should return 404 when order is not found', async () => {
      mockInstance.updateStatus.mockResolvedValue({
        status: 404,
        message: 'Not Found',
      });
      const res = await request(globalThis.app)
        .patch('/orders/999/status')
        .send({ status: 'completed' });
      expect(res.status).toBe(404);
      expect(res.body).toEqual({ status: 404, message: 'Not Found' });
    });
    it('should return 409 if status update is not allowed', async () => {
      mockInstance.updateStatus.mockResolvedValue({
        status: 409,
        message: 'Conflict',
      });
      const res = await request(globalThis.app)
        .patch('/orders/1/status')
        .send({ status: 'completed' });
      expect(res.status).toBe(409);
      expect(res.body).toEqual({ status: 409, message: 'Conflict' });
    });
    it('should return 500 when service throws error', async () => {
      mockInstance.updateStatus.mockRejectedValue(new Error('DB error'));
      const res = await request(globalThis.app)
        .patch('/orders/1/status')
        .send({ status: 'completed' });
      expect(res.status).toBe(500);
    });
  });

  describe('count orders', () => {
    it('should return 200 with count', async () => {
      mockInstance.count.mockResolvedValue({ status: 200, count: 5 });
      const res = await request(globalThis.app).get('/orders-count');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ status: 200, count: 5 });
    });
    it('should return 500 when service throws error', async () => {
      mockInstance.count.mockRejectedValue(new Error('DB error'));
      const res = await request(globalThis.app).get('/orders-count');
      expect(res.status).toBe(500);
    });
  });

  describe('delete order', () => {
    it('should return 200 when order is deleted', async () => {
      mockInstance.delete.mockResolvedValue({
        status: 200,
        message: 'Deleted',
      });
      const res = await request(globalThis.app).delete('/orders/1');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ status: 200, message: 'Deleted' });
    });
    it('should return 404 when order is not found', async () => {
      mockInstance.delete.mockResolvedValue({
        status: 404,
        message: 'Not Found',
      });
      const res = await request(globalThis.app).delete('/orders/999');
      expect(res.status).toBe(404);
      expect(res.body).toEqual({ status: 404, message: 'Not Found' });
    });
    it('should return 409 if order cannot be deleted due to conflict', async () => {
      mockInstance.delete.mockResolvedValue({
        status: 409,
        message: 'Conflict',
      });
      const res = await request(globalThis.app).delete('/orders/1');
      expect(res.status).toBe(409);
      expect(res.body).toEqual({ status: 409, message: 'Conflict' });
    });
    it('should return 500 when service throws error', async () => {
      mockInstance.delete.mockRejectedValue(new Error('DB error'));
      const res = await request(globalThis.app).delete('/orders/1');
      expect(res.status).toBe(500);
    });
  });
});
