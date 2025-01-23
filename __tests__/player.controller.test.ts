import request from 'supertest';
import app from '../src/app';

describe('Player Controller', () => {
    it('deve listar todos os jogadores', async () => {
        const response = await request(app).get('/api/players');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    }, 20000)

    it('deve criar um novo jogador', async () => {
        const newPlayer = { name: 'Rafael', position: 'Goalkeeper', teamId: 1 };
        const response = await request(app).post('/api/players').send(newPlayer);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe(newPlayer.name);
    });
});
