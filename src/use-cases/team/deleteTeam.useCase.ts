// src/use-cases/team/deleteTeam.useCase.ts
import TeamRepository from '../../repositories/team.repository';

class DeleteTeamUseCase {
    async execute(id: number) {
        if (!id) {
            throw new Error('Team ID is required to delete a team');
        }

        const team = await TeamRepository.findById(id);
        if (!team) {
            throw new Error('Team not found');
        }

        await TeamRepository.delete(id);
        return { message: 'Team deleted successfully' };
    }
}

export default new DeleteTeamUseCase();