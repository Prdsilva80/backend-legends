// src/repositories/player.repository.ts
import prisma from '../config/database';

class PlayerRepository {
    async findAll() {
        return prisma.player.findMany();
    }

    async findById(id: number) {
        return prisma.player.findUnique({ where: { id } });
    }

    async create(data: { name: string; position: string; teamId: number }) {
        return prisma.player.create({ data });
    }

    async update(id: number, data: { name?: string; position?: string; teamId?: number }) {
        return prisma.player.update({ where: { id }, data });
    }

    async delete(id: number) {
        return prisma.player.delete({ where: { id } });
    }
}

export default new PlayerRepository();
