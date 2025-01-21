// src/use-cases/player/updatePlayer.useCase.ts
import PlayerRepository from '../../repositories/player.repository';

class UpdatePlayerUseCase {
    async execute(id: number, data: { name?: string; position?: string; teamId?: number }) {
        if (!id) {
            throw new Error('Player ID is required to update a player');
        }

        const player = await PlayerRepository.findById(id);
        if (!player) {
            throw new Error('Player not found');
        }

        const updatedPlayer = await PlayerRepository.update(id, data);
        return updatedPlayer;
    }
}

export default new UpdatePlayerUseCase();