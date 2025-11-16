// src/services/apiDebug.ts
const API_BASE_URL = 'https://worldcup2026.shrp.dev';

export const apiDebug = {
  // Test direct sans votre wrapper
  getTeamsDirect: async () => {
    try {
      console.log('🔍 Testing API directly: GET /teams');
      const response = await fetch(`${API_BASE_URL}/teams`);
      console.log('📊 Response status:', response.status);
      console.log('📊 Response headers:', response.headers);
      
      const text = await response.text();
      console.log('📄 Raw response text:', text);
      
      try {
        const data = JSON.parse(text);
        console.log('✅ Parsed JSON:', data);
        return data;
      } catch (parseError) {
        console.error('❌ JSON parse error:', parseError);
        return text;
      }
    } catch (error) {
      console.error('💥 Fetch error:', error);
      throw error;
    }
  },

  getGroupsDirect: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/groups`);
      const text = await response.text();
      console.log('📄 Raw groups response:', text);
      return JSON.parse(text);
    } catch (error) {
      console.error('💥 Groups fetch error:', error);
      throw error;
    }
  },

  getMatchesDirect: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/matches`);
      const text = await response.text();
      console.log('📄 Raw matches response:', text);
      return JSON.parse(text);
    } catch (error) {
      console.error('💥 Matches fetch error:', error);
      throw error;
    }
  }
};