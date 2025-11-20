import React, { useState, useMemo, useCallback } from 'react';
import EmployeeCard from '../EmployeeCard/EmployeeCard';
import './EmployeeList.css';

const EmployeeList = ({ 
  employees, 
  onDelete, 
  onDeleteMultiple 
}) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const displayedEmployees = useMemo(() => {
    return showAll ? employees : employees.slice(0, 3);
  }, [employees, showAll]);

  const handleSelect = useCallback((id) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((selectedId) => selectedId !== id);
      }
      return [...prev, id];
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    if (selectedIds.length === displayedEmployees.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(displayedEmployees.map((emp) => emp.id));
    }
  }, [displayedEmployees, selectedIds.length]);

  const handleBulkDelete = useCallback(() => {
    if (selectedIds.length === 0) {
      alert('Please select at least one employee to delete');
      return;
    }

    if (window.confirm(
      `Are you sure you want to delete ${selectedIds.length} employee(s)?`
    )) {
      onDeleteMultiple(selectedIds);
      setSelectedIds([]);
    }
  }, [selectedIds, onDeleteMultiple]);

  const allSelected = useMemo(() => 
    displayedEmployees.length > 0 && selectedIds.length === displayedEmployees.length,
    [displayedEmployees.length, selectedIds.length]
  );

  if (employees.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📭</div>
        <h3 className="empty-title">No Employees Found</h3>
        <p className="empty-description">
          There are no employees to display at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="employee-list-container">
      <div className="list-header">
        <div className="list-info">
          <h2 className="list-title">Employee Directory</h2>
          <p className="list-description">
            Showing {displayedEmployees.length} of {employees.length} employee{employees.length !== 1 ? 's' : ''}
            {selectedIds.length > 0 && ` • ${selectedIds.length} selected`}
          </p>
        </div>

        <div className="list-actions">
          <label className="select-all-container">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={handleSelectAll}
            />
            <span>Select All</span>
          </label>

          {selectedIds.length > 0 && (
            <button 
              className="bulk-delete-button" 
              onClick={handleBulkDelete}
            >
              Delete Selected ({selectedIds.length})
            </button>
          )}
        </div>
      </div>

      <div className="employee-grid">
        {displayedEmployees.map((employee) => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
            onDelete={onDelete}
            isSelected={selectedIds.includes(employee.id)}
            onSelect={handleSelect}
          />
        ))}
      </div>

      {employees.length > 3 && (
        <div className="see-more-container">
          <button 
            className="see-more-button" 
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : `See More (${employees.length - 3} more)`}
          </button>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
