import axios from 'axios';

const API_BASE_URL = 'http://localhost:4050';
// const API_BASE_URL = 'https://techstack-googlemeet.vercel.app';


// Authenticate user and store token in session
export const authenticateUser = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/meet/authenticate`, {}, { withCredentials: true });
    return response.data; // { message, email }
  } catch (error) {
    console.error('Error authenticating:', error);
    throw error;
  }
};


// Create Meet space (requires authentication first)
export const createMeetSpace = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/meet/create-space`, {}, { withCredentials: true });
    return response.data; // { meetingUrl, email }
  } catch (error) {
    console.error('Error creating Meet space:', error);
    throw error;
  }
};
