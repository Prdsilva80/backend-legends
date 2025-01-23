import request from 'supertest';
import app from '../src/app';

describe('Event Controller', () => {
    it('deve listar todos os eventos', async () => {
        const response = await request(app).get('/api/events');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    }, 20000)

    it('deve criar um novo evento', async () => {
        const newEvent = { name: 'Final Match', date: '2025-12-31T00:00:00.000Z', location: 'Morumbi', teamId: 1 };
        const response = await request(app).post('/api/events').send(newEvent);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe(newEvent.name);
    });
});
