import axios from 'axios';
import { apiFutebolConfig } from '../config/apiFutebol.config';

class ApiFutebolService {
    private api = axios.create({
        baseURL: apiFutebolConfig.baseUrl,
        headers: {
            Authorization: `Bearer ${apiFutebolConfig.apiKey}`,
        },
    });

    async getCompetitionById(competitionId: number) {
        try {
            const response = await this.api.get(`/campeonatos/${competitionId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching competition by ID:', error);
            throw new Error('Could not fetch competition details from API Futebol');
        }
    }

    async getCompetitions() {
        try {
            const response = await this.api.get('/campeonatos'); // Endpoint correto
            return response.data;
        } catch (error) {
            console.error('Error fetching competitions:', error);
            throw new Error('Could not fetch competitions from API Futebol');
        }
    }

    async getChampionshipById(campeonatoId: number) {
        try {
            const response = await this.api.get(`/campeonatos/${campeonatoId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching championship with ID ${campeonatoId}:`, error);
            throw new Error('Could not fetch championship from API Futebol');
        }
    }

    async getTeams(competitionId: number) {
        try {
            const response = await this.api.get(`/campeonatos/${competitionId}/tabela`);
            return response.data;
        } catch (error: any) {
            console.error('Error fetching teams for competition ID:', competitionId, error.response?.data || error.message);
            throw new Error(`Could not fetch teams for competition ID ${competitionId}`);
        }
    }            

    async getMatches(competitionId: number) {
        try {
            // Busca informações do campeonato para obter a fase atual
            const competitionResponse = await this.api.get(`/campeonatos/${competitionId}`);
            const faseId = competitionResponse.data.fase_atual.fase_id;
    
            // Busca partidas da fase atual
            const matchesResponse = await this.api.get(`/campeonatos/${competitionId}/fases/${faseId}`);
            return matchesResponse.data;
        } catch (error: any) {
            console.error('Error fetching matches for competition ID:', competitionId, error.response?.data || error.message);
            throw new Error(`Could not fetch matches for competition ID ${competitionId}`);
        }
    }    
}

export default new ApiFutebolService();
