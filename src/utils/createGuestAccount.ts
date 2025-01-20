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
      // {
      //   jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      //   user: {
      //     id: 123,
      //     username: "550e8400-e29b-41d4-a716-446655440000",
      //     isGuest: true
      //   }
      // }
  
      // Сохраняем токен для дальнейших запросов
      localStorage.setItem('jwt', data.jwt);
      
      return data;

    } catch (error) {
      console.error('Error creating guest account:', error);
    }
  };
  
  // Использование токена в последующих запросах
  const makeAuthenticatedRequest = async () => {
    const jwt = localStorage.getItem('jwt');
    
    const response = await fetch('http://localhost:1337/api/some-protected-route', {
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    });
  };