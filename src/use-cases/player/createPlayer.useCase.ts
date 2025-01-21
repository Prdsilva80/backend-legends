// src/use-cases/player/createPlayer.useCase.ts
import PlayerRepository from '../../repositories/player.repository';

class CreatePlayerUseCase {
    async execute(data: { name: string; position: string; teamId: number }) {
        if (!data.name || !data.position || !data.teamId) {
            throw new Error('Name, position, and teamId are required to create a player');
        }

        const newPlayer = await PlayerRepository.create(data);
        return newPlayer;
    }
}

export default new CreatePlayerUseCase();