import { useState, useEffect, useCallback } from 'react';
import { employeeService } from '../services/employeeService';

export const useEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await employeeService.fetchAllEmployees();
      setEmployees(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = useCallback((id) => {
    setEmployees((prevEmployees) => 
      prevEmployees.filter((emp) => emp.id !== id)
    );
  }, []);

  const deleteMultipleEmployees = useCallback((ids) => {
    setEmployees((prevEmployees) => 
      prevEmployees.filter((emp) => !ids.includes(emp.id))
    );
  }, []);

  return {
    employees,
    loading,
    error,
    deleteEmployee,
    deleteMultipleEmployees,
    refetch: fetchEmployees,
  };
};
