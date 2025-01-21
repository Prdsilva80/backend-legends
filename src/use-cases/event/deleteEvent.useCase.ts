// src/use-cases/events/deleteEvent.useCase.ts
import EventRepository from '../../repositories/event.repository';

class DeleteEventUseCase {
    async execute(id: number) {
        if (!id) {
            throw new Error('Event ID is required to delete an event');
        }

        const event = await EventRepository.findById(id);
        if (!event) {
            throw new Error('Event not found');
        }

        await EventRepository.delete(id);
        return { message: 'Event deleted successfully' };
    }
}

export default new DeleteEventUseCase();