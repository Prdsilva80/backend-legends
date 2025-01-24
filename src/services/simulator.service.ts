class SimulatorService {
    simulateMatch(teamA: string, teamB: string) {
        const teamAScore = Math.floor(Math.random() * 5);
        const teamBScore = Math.floor(Math.random() * 5);

        return {
            teamA,
            teamB,
            teamAScore,
            teamBScore,
            winner: teamAScore > teamBScore ? teamA : teamBScore > teamAScore ? teamB : 'Draw',
        };
    }

    generatePlayerStats(playerId: number) {
        return {
            playerId,
            goals: Math.floor(Math.random() * 20),
            assists: Math.floor(Math.random() * 10),
            matchesPlayed: Math.floor(Math.random() * 30),
        };
    }

    generateTeamStats(teamId: number) {
        return {
            teamId,
            wins: Math.floor(Math.random() * 20),
            draws: Math.floor(Math.random() * 10),
            losses: Math.floor(Math.random() * 10),
            goalsScored: Math.floor(Math.random() * 50),
            goalsConceded: Math.floor(Math.random() * 30),
        };
    }
}

export default new SimulatorService();
