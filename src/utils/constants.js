export const API_BASE_URL = '';

export const ENDPOINTS = {
  EMPLOYEES: "https://dummy.restapiexample.com/api/v1/employees",
  EMPLOYEE: (id) => `https://dummy.restapiexample.com/api/v1/employee/${id}`,
};

export const PLACEHOLDER_IMAGE = 'https://w7.pngwing.com/pngs/518/320/png-transparent-computer-icons-mobile-app-development-android-my-account-icon-blue-text-logo-thumbnail.png';

export const ERROR_MESSAGES = {
  FETCH_ERROR: 'Failed to fetch employee data.',
  EMPLOYEE_NOT_FOUND: 'No employee found.',
  SEARCH_ERROR: 'No such employee found.',
};
