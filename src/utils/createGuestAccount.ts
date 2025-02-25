import { BASE_API_URL } from "../../constants";

export const createGuestAccount = async () => {
    try {
      const response = await fetch(`${BASE_API_URL}api/order/createGuestAccount`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      const data = await response.json();
      
      console.log('Guest account created:', data);
      localStorage.setItem('jwt', data.jwt);
      
      return data;

    } catch (error) {
      console.error('Error creating guest account:', error);
    }
  };