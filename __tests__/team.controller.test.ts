import request from 'supertest';
import app from '../src/app';

describe('Team Controller', () => {
    it('deve listar todos os times', async () => {
        const response = await request(app).get('/api/teams');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    }, 20000)

    it('deve criar um novo time', async () => {
        const newTeam = { name: 'São Paulo FC', country: 'Brazil' };
        const response = await request(app).post('/api/teams').send(newTeam);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe(newTeam.name);
    });
});
