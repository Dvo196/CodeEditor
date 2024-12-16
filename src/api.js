
import axios from 'axios'
export const api = async (language, code) => {
    try {
      // Только запрос к EMKC API
      const response = await axios.post('https://emkc.org/api/v1/piston/execute', {
        language,
        source: code,
        stdin: '',
      });
  
      console.log('API response:', response.data); // Логируем ответ
      return response.data; // Возвращаем данные от API
    } catch (error) {
      console.error('API request error:', error);
      return { error: 'Error in API request' };
    }
  };
  