// src/use-cases/player/deletePlayer.useCase.ts
import PlayerRepository from '../../repositories/player.repository';

class DeletePlayerUseCase {
    async execute(id: number) {
        if (!id) {
            throw new Error('Player ID is required to delete a player');
        }

        const player = await PlayerRepository.findById(id);
        if (!player) {
            throw new Error('Player not found');
        }

        await PlayerRepository.delete(id);
        return { message: 'Player deleted successfully' };
    }
}

export default new DeletePlayerUseCase();