import axios from 'axios';

export const keycloakService = {
  getAccessToken: async () => {
    const response = await axios.post(
      `${process.env.KEYCLOAK_BASE_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`,
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.KEYCLOAK_CLIENT_ID,
        client_secret: process.env.KEYCLOAK_CLIENT_SECRET
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    return response.data.access_token;
  },

  createVirtualMachine: async (userData) => {
    const accessToken = await keycloakService.getAccessToken();
    
    return axios.post(
      `${process.env.KEYCLOAK_BASE_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/users`,
      {
        username: userData.username,
        enabled: true,
        firstName: userData.username,
        lastName: userData.ipAddress,
        attributes: {
          showpw: userData.password,
          roomNumber: userData.roomNumber,
          deskNumber: userData.deskNumber,
        },
        credentials: [{
          type: 'password',
          value: userData.password,
          temporary: false
        }]
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
  },

  getVirtualMachines: async () => {
    const accessToken = await keycloakService.getAccessToken();
    
    const response = await axios.get(
      `${process.env.KEYCLOAK_BASE_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/users`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  }
};