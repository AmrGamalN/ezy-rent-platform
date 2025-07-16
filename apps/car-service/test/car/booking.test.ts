import request from 'supertest';
import { BookingService } from '../../src/service/car/booking.service';
import { BookingController } from '../../src/controller/car/booking.controller';
describe('BookingController', () => {
  let mockInstance;
  beforeAll(async () => {
    jest.restoreAllMocks();
    mockInstance = {
      create: jest.fn(),
      get: jest.fn(),
      getAll: jest.fn(),
      updateByRenter: jest.fn(),
      updateStatus: jest.fn(),
      delete: jest.fn(),
    };
    jest.spyOn(BookingService, 'getInstance').mockReturnValue(mockInstance);
    const controller = new BookingController();
    globalThis.app.post('/bookings', controller.create);
    globalThis.app.get('/bookings/:id', controller.get);
    globalThis.app.get('/bookings', controller.getAll);
    globalThis.app.patch(
      '/bookings/:id/update-renter',
      controller.updateByRenter,
    );
    globalThis.app.patch(
      '/bookings/:id/update-status',
      controller.updateStatus,
    );
    globalThis.app.delete('/bookings/:id', controller.delete);
  });

  describe('create booking', () => {
    it('should return 201 when booking is created successfully', async () => {
      mockInstance.create.mockResolvedValue({
        status: 201,
        message: 'Created',
        data: { carId: '1', userId: '2' },
      });
      const res = await request(globalThis.app)
        .post('/bookings')
        .send({ carId: '1', userId: '2' });
      expect(res.status).toBe(201);
    });

    it('should return 400 if bad request data is sent', async () => {
      mockInstance.create.mockResolvedValue({
        status: 400,
        message: 'Bad Request',
      });
      const res = await request(globalThis.app).post('/bookings').send({});
      expect(res.status).toBe(400);
      expect(res.body).toEqual({ status: 400, message: 'Bad Request' });
    });

    it('should return 401 if user is not authenticated', async () => {
      mockInstance.create.mockResolvedValue({
        status: 401,
        message: 'Unauthorized',
      });
      const res = await request(globalThis.app)
        .post('/bookings')
        .send({ carId: '1' });
      expect(res.status).toBe(401);
      expect(res.body).toEqual({ status: 401, message: 'Unauthorized' });
    });

    it('should return 404 if car is not found', async () => {
      mockInstance.create.mockResolvedValue({
        status: 404,
        message: 'Not Found',
      });
      const res = await request(globalThis.app)
        .post('/bookings')
        .send({ carId: '1' });
      expect(res.status).toBe(404);
      expect(res.body).toEqual({ status: 404, message: 'Not Found' });
    });

    it('should return 500 when service throws error', async () => {
      mockInstance.create.mockRejectedValue(new Error('DB error'));
      const res = await request(globalThis.app)
        .post('/bookings')
        .send({ carId: '1', userId: '2' });
      expect(res.status).toBe(500);
    });
  });

  describe('get booking', () => {
    it('should return 200 when booking is found', async () => {
      mockInstance.get.mockResolvedValue({ status: 200, message: 'OK' });
      const res = await request(globalThis.app).get('/bookings/1');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ status: 200, message: 'OK' });
    });

    it('should return 404 when booking is not found', async () => {
      mockInstance.get.mockResolvedValue({ status: 404, message: 'Not Found' });
      const res = await request(globalThis.app).get('/bookings/999');
      expect(res.status).toBe(404);
      expect(res.body).toEqual({ status: 404, message: 'Not Found' });
    });

    it('should return 500 when service throws error', async () => {
      mockInstance.get.mockRejectedValue(new Error('DB error'));
      const res = await request(globalThis.app).get('/bookings/1');
      expect(res.status).toBe(500);
    });
  });

  describe('get all bookings', () => {
    it('should return 200 when bookings are found', async () => {
      mockInstance.getAll.mockResolvedValue({ status: 200, message: 'OK' });
      const res = await request(globalThis.app).get('/bookings');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ status: 200, message: 'OK' });
    });

    it('should return 500 when service throws error', async () => {
      mockInstance.getAll.mockRejectedValue(new Error('DB error'));
      const res = await request(globalThis.app).get('/bookings');
      expect(res.status).toBe(500);
    });
  });

  describe('update booking by renter', () => {
    it('should return 200 when booking is updated', async () => {
      mockInstance.updateByRenter.mockResolvedValue({
        status: 200,
        message: 'OK',
      });
      const res = await request(globalThis.app)
        .patch('/bookings/1/update-renter')
        .send({ renterId: '2' });
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ status: 200, message: 'OK' });
    });
    it('should return 404 when booking is not found', async () => {
      mockInstance.updateByRenter.mockResolvedValue({
        status: 404,
        message: 'Not Found',
      });
      const res = await request(globalThis.app)
        .patch('/bookings/999/update-renter')
        .send({ renterId: '2' });
      expect(res.status).toBe(404);
      expect(res.body).toEqual({ status: 404, message: 'Not Found' });
    });
    it('should return 500 when service throws error', async () => {
      mockInstance.updateByRenter.mockRejectedValue(new Error('DB error'));
      const res = await request(globalThis.app)
        .patch('/bookings/1/update-renter')
        .send({ renterId: '2' });
      expect(res.status).toBe(500);
    });
  });

  describe('update booking status', () => {
    it('should return 200 when booking is updated', async () => {
      mockInstance.updateStatus.mockResolvedValue({
        status: 200,
        message: 'OK',
      });
      const res = await request(globalThis.app)
        .patch('/bookings/1/update-status')
        .send({ status: 'completed' });
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ status: 200, message: 'OK' });
    });
    it('should return 404 when booking is not found', async () => {
      mockInstance.updateStatus.mockResolvedValue({
        status: 404,
        message: 'Not Found',
      });
      const res = await request(globalThis.app)
        .patch('/bookings/999/update-status')
        .send({ status: 'completed' });
      expect(res.status).toBe(404);
      expect(res.body).toEqual({ status: 404, message: 'Not Found' });
    });
    it('should return 500 when service throws error', async () => {
      mockInstance.updateStatus.mockRejectedValue(new Error('DB error'));
      const res = await request(globalThis.app)
        .patch('/bookings/1/update-status')
        .send({ status: 'completed' });
      expect(res.status).toBe(500);
    });
  });

  describe('delete booking', () => {
    it('should return 200 when booking is deleted', async () => {
      mockInstance.delete.mockResolvedValue({ status: 200, message: 'OK' });
      const res = await request(globalThis.app).delete('/bookings/1');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ status: 200, message: 'OK' });
    });
    it('should return 401 when user is not authenticated', async () => {
      mockInstance.delete.mockResolvedValue({
        status: 401,
        message: 'Unauthorized',
      });
      const res = await request(globalThis.app).delete('/bookings/1');
      expect(res.status).toBe(401);
      expect(res.body).toEqual({ status: 401, message: 'Unauthorized' });
    });
    it('should return 404 when booking is not found', async () => {
      mockInstance.delete.mockResolvedValue({
        status: 404,
        message: 'Not Found',
      });
      const res = await request(globalThis.app).delete('/bookings/999');
      expect(res.status).toBe(404);
      expect(res.body).toEqual({ status: 404, message: 'Not Found' });
    });
    it('should return 500 when service throws error', async () => {
      mockInstance.delete.mockRejectedValue(new Error('DB error'));
      const res = await request(globalThis.app).delete('/bookings/1');
      expect(res.status).toBe(500);
    });
  });
});
