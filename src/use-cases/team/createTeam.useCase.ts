// src/use-cases/team/createTeam.useCase.ts
import TeamRepository from '../../repositories/team.repository';

class CreateTeamUseCase {
    async execute(data: { name: string }) {
        if (!data.name) {
            throw new Error('Name is required to create a team');
        }

        const newTeam = await TeamRepository.create(data);
        return newTeam;
    }
}

export default new CreateTeamUseCase();