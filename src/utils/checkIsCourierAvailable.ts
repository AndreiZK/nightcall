import { BASE_API_URL } from "../../constants";

export const checkCourierAvailability = async () => {
    try {
      const response = await fetch(`${BASE_API_URL}api/order/checkIsCourierAvailable`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (!response.ok) {
        console.log(response);
        throw new Error('Failed to check courier availability');
      }
  
      const isAvailable = await response.json();
      return isAvailable;
    } catch (error) {
      console.error('Error checking courier availability:', error);
      throw error;
    }
  };