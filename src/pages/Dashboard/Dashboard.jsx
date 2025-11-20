import React, { useMemo } from 'react';
import Header from '../../components/Header/Header';
import SearchBar from '../../components/SearchBar/SearchBar';
import EmployeeList from '../../components/EmployeeList/EmployeeList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useEmployees } from '../../hooks/useEmployees';
import { useSearch } from '../../hooks/useSearch';
import './Dashboard.css';

const Dashboard = () => {
  const {
    employees,
    loading,
    error,
    deleteEmployee,
    deleteMultipleEmployees,
    refetch,
  } = useEmployees();

  const {
    searchId,
    setSearchId,
    searchResult,
    searchError,
    handleSearch,
    clearSearch,
  } = useSearch(employees);

  const displayedEmployees = useMemo(() => {
    return searchResult ? [searchResult] : employees;
  }, [searchResult, employees]);

  if (loading) {
    return (
      <div className="dashboard">
        <Header />
        <div className="dashboard-content">
          <Loader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <Header />
        <div className="dashboard-content">
          <ErrorMessage message={error} onRetry={refetch} />
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Header />
      
      <div className="dashboard-content">
        <SearchBar
          searchId={searchId}
          onSearchChange={setSearchId}
          onSearch={handleSearch}
          onClear={clearSearch}
          searchError={searchError}
        />

        <EmployeeList
          employees={displayedEmployees}
          onDelete={deleteEmployee}
          onDeleteMultiple={deleteMultipleEmployees}
        />
      </div>
    </div>
  );
};

export default Dashboard;