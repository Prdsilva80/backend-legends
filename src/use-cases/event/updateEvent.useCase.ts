// src/use-cases/events/updateEvent.useCase.ts
import EventRepository from '../../repositories/event.repository';

class UpdateEventUseCase {
    async execute(id: number, data: { name?: string; date?: Date }) {
        if (!id) {
            throw new Error('Event ID is required to update an event');
        }

        const event = await EventRepository.findById(id);
        if (!event) {
            throw new Error('Event not found');
        }

        const updatedEvent = await EventRepository.update(id, data);
        return updatedEvent;
    }
}

export default new UpdateEventUseCase();