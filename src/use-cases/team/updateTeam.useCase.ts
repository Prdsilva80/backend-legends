// src/use-cases/team/updateTeam.useCase.ts
import TeamRepository from '../../repositories/team.repository';

class UpdateTeamUseCase {
    async execute(id: number, data: { name?: string }) {
        if (!id) {
            throw new Error('Team ID is required to update a team');
        }

        const team = await TeamRepository.findById(id);
        if (!team) {
            throw new Error('Team not found');
        }

        const updatedTeam = await TeamRepository.update(id, data);
        return updatedTeam;
    }
}

export default new UpdateTeamUseCase();