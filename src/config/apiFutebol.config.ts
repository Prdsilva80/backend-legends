import dotenv from 'dotenv';

dotenv.config();

const API_FUTEBOL_KEY = process.env.API_FUTEBOL_KEY;

if (!API_FUTEBOL_KEY) {
    throw new Error('API_FUTEBOL_KEY is not defined in the environment variables');
}

export const apiFutebolConfig = {
    apiKey: API_FUTEBOL_KEY,
    baseUrl: 'https://api.api-futebol.com.br/v1/',
};
