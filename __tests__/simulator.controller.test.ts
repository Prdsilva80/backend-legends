import SimulatorService from '../src/services/simulator.service';

describe('Simulator Service', () => {
    it('should simulate a match and return a winner', () => {
        const result = SimulatorService.simulateMatch('Team A', 'Team B');

        expect(result).toHaveProperty('teamA', 'Team A');
        expect(result).toHaveProperty('teamB', 'Team B');
        expect(result).toHaveProperty('teamAScore');
        expect(result).toHaveProperty('teamBScore');
        expect(['Team A', 'Team B', 'Draw']).toContain(result.winner);
    }, 20000);

    it('should generate player stats', () => {
        const stats = SimulatorService.generatePlayerStats(1);

        expect(stats).toHaveProperty('playerId', 1);
        expect(stats).toHaveProperty('goals');
        expect(stats).toHaveProperty('assists');
        expect(stats).toHaveProperty('matchesPlayed');
    }, 20000);

    it('should generate team stats', () => {
        const stats = SimulatorService.generateTeamStats(1);

        expect(stats).toHaveProperty('teamId', 1);
        expect(stats).toHaveProperty('wins');
        expect(stats).toHaveProperty('losses');
        expect(stats).toHaveProperty('draws');
        expect(stats).toHaveProperty('goalsScored');
        expect(stats).toHaveProperty('goalsConceded');
    }, 20000);
});
