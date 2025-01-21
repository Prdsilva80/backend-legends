// src/use-cases/events/createEvent.useCase.ts
import EventRepository from '../../repositories/event.repository';

class CreateEventUseCase {
    async execute(data: { name: string; date: Date }) {
        if (!data.name || !data.date) {
            throw new Error('Name and date are required to create an event');
        }

        const newEvent = await EventRepository.create(data);
        return newEvent;
    }
}

export default new CreateEventUseCase();