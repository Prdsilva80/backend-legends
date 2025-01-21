// src/repositories/team.repository.ts
import prisma from '../config/database';

class TeamRepository {
    async findAll() {
        return prisma.team.findMany({ include: { Players: true } });
    }

    async findById(id: number) {
        return prisma.team.findUnique({ where: { id }, include: { Players: true } });
    }

    async create(data: { name: string }) {
        return prisma.team.create({ data });
    }

    async update(id: number, data: { name?: string }) {
        return prisma.team.update({ where: { id }, data });
    }

    async delete(id: number) {
        return prisma.team.delete({ where: { id } });
    }
}

export default new TeamRepository();