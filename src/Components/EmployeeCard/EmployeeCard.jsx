import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PLACEHOLDER_IMAGE } from '../../utils/constants';
import './EmployeeCard.css';

const EmployeeCard = memo(({
    employee,
    onDelete,
    isSelected,
    onSelect
}) => {
    const navigate = useNavigate();

    const handleCardClick = (e) => {
        if (
            e.target.closest('.card-actions') ||
            e.target.closest('.card-checkbox')
        ) {
            return;
        }
        navigate(`/employee/${employee.id}`);
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        if (window.confirm(`Delete ${employee.employee_name}?`)) {
            onDelete(employee.id);
        }
    };

    const handleEdit = (e) => {
        e.stopPropagation();
        alert(`Edit ${employee.employee_name} (for display purpose)`);
    };

    const handleCheckboxChange = (e) => {
        e.stopPropagation();
        onSelect(employee.id);
    };

    return (
        <div
            className={`employee-card ${isSelected ? 'selected' : ''}`}
            onClick={handleCardClick}
        >
            <div className="card-checkbox" onClick={(e) => e.stopPropagation()}>
                <input
                    type="checkbox"
                    id={`checkbox-${employee.id}`}
                    checked={isSelected}
                    onChange={handleCheckboxChange}
                    className="checkbox-input"
                />
                <label htmlFor={`checkbox-${employee.id}`} className="checkbox-label">
                    <svg className="checkbox-icon" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M5 13l4 4L19 7"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </label>
            </div>

            <div className="card-header">
                <div className="header-background"></div>
            </div>

            <div className="card-image-wrapper">
                <div className="card-image-container">
                    <img
                        src={employee.profile_image || PLACEHOLDER_IMAGE}
                        alt={employee.employee_name}
                        className="card-image"
                        onError={(e) => {
                            e.target.src = PLACEHOLDER_IMAGE;
                        }}
                    />
                </div>
            </div>

            <div className="card-content">
                <h3 className="card-name">{employee.employee_name}</h3>
                <p className="card-role">Employee</p>

                <div className="card-stats">
                    <div className="stat-item">
                        <span className="stat-value">{employee.employee_age}</span>
                        <span className="stat-label">Age</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-value">${(parseInt(employee.employee_salary) / 1000).toFixed(1)}k</span>
                        <span className="stat-label">Salary</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-value">#{employee.id}</span>
                        <span className="stat-label">ID</span>
                    </div>
                </div>
            </div>

            <div className="card-actions">
                <button className="action-button edit-button" onClick={handleEdit}>
                    Edit
                </button>
                <button className="action-button delete-button" onClick={handleDelete}>
                    Delete
                </button>
            </div>
        </div>
    );
});

EmployeeCard.displayName = 'EmployeeCard';
export default EmployeeCard;
