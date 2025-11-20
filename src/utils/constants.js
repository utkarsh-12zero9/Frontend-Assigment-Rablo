import userprofile from '../assets/Images/userprofile.png';


//! API urls
export const API_BASE_URL = 'https://dummy.restapiexample.com/api/v1/employees';
export const ENDPOINTS = {
  EMPLOYEES: API_BASE_URL,
  EMPLOYEE: (id) => `${API_BASE_URL}/${id}`,
};


//! Image
export const PLACEHOLDER_IMAGE = userprofile;


//! Error Messages
export const ERROR_MESSAGES = {
  FETCH_ERROR: 'Failed to fetch employee data.',
  EMPLOYEE_NOT_FOUND: 'No employee found.',
  SEARCH_ERROR: 'No such employee found.',
};
