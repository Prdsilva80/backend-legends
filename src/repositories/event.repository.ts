// src/repositories/event.repository.ts
import prisma from '../config/database';

class EventRepository {
    async findAll() {
        return prisma.event.findMany();
    }

    async findById(id: number) {
        return prisma.event.findUnique({ where: { id } });
    }

    async create(data: { name: string; date: Date }) {
        return prisma.event.create({ data });
    }

    async update(id: number, data: { name?: string; date?: Date }) {
        return prisma.event.update({ where: { id }, data });
    }

    async delete(id: number) {
        return prisma.event.delete({ where: { id } });
    }
}

export default new EventRepository();