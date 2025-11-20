import { ENDPOINTS } from "../utils/constants";
import { mockEmployees } from "../mocks/mockData";

export const employeeService = {
    //! Employees Fetch krne ke liye
    async fetchAllEmployees() {
        try {
            const response = await fetch(ENDPOINTS.EMPLOYEES);
            if (!response.ok) {
                console.warn("API failed, using mock data");
                return mockEmployees;
            }
            const result = await response.json();
            return result.data || mockEmployees;
        } catch (error) {
            console.warn("API error, using mock data:", error);
            return mockEmployees;
        }
    },

    //! Searh krne ke liye
    async fetchEmployeeById(id) {
        try {
            const response = await fetch(ENDPOINTS.EMPLOYEE(id));
            if (!response.ok) {
                const mockEmp = mockEmployees.find((emp) => emp.id === parseInt(id));
                return mockEmp || null;
            }
            const result = await response.json();
            return result.data || null;
        } catch (error) {
            const mockEmp = mockEmployees.find((emp) => emp.id === parseInt(id));
            return mockEmp || null;
        }
    },
};
