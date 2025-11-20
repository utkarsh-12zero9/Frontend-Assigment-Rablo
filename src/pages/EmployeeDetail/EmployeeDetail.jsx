import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { employeeService } from '../../services/employeeService';
import { PLACEHOLDER_IMAGE } from '../../utils/constants';
import Loader from '../../Components/Loader/Loader';
import ErrorMessage from '../../Components/ErrorMessage/ErrorMessage';
import './EmployeeDetail.css';

const EmployeeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchEmployeeDetail();
    }, [id]);

    const fetchEmployeeDetail = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await employeeService.fetchEmployeeById(id);
            setEmployee(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="employee-detail-page">
                <Loader />
            </div>
        );
    }

    if (error || !employee) {
        return (
            <div className="employee-detail-page">
                <ErrorMessage
                    message={error || 'Employee not found'}
                    onRetry={fetchEmployeeDetail}
                />
                <button className="back-button" onClick={() => navigate('/')}>
                    ← Back to Dashboard
                </button>
            </div>
        );
    }

    return (
        <div className="employee-detail-page">
            <div className="detail-container">
                <button className="back-button" onClick={() => navigate('/')}>
                    ← Back to Dashboard
                </button>

                <div className="detail-card">
                    <div className="detail-header">
                        <div className="detail-image-container">
                            <img
                                src={employee.profile_image || PLACEHOLDER_IMAGE}
                                alt={employee.employee_name}
                                className="detail-image"
                                onError={(e) => {
                                    e.target.src = PLACEHOLDER_IMAGE;
                                }}
                            />
                        </div>

                        <div className="detail-header-info">
                            <h1 className="detail-name">{employee.employee_name}</h1>
                            <p className="detail-id">Employee ID: {employee.id}</p>
                        </div>
                    </div>

                    <div className="detail-body">
                        <h2 className="section-title">Employee Information</h2>
                        <p className="section-description">
                            Complete details and information about this employee
                        </p>

                        <div className="detail-grid">
                            <div className="detail-field">
                                <span className="field-label">Full Name</span>
                                <span className="field-value">{employee.employee_name}</span>
                            </div>

                            <div className="detail-field">
                                <span className="field-label">Employee ID</span>
                                <span className="field-value">{employee.id}</span>
                            </div>

                            <div className="detail-field">
                                <span className="field-label">Age</span>
                                <span className="field-value">{employee.employee_age} years</span>
                            </div>

                            <div className="detail-field">
                                <span className="field-label">Annual Salary</span>
                                <span className="field-value salary">
                                    ₹{parseInt(employee.employee_salary).toLocaleString()}
                                </span>
                            </div>

                            <div className="detail-field">
                                <span className="field-label">Monthly Salary</span>
                                <span className="field-value">
                                    ₹{(parseInt(employee.employee_salary) / 12).toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </span>
                            </div>

                            <div className="detail-field">
                                <span className="field-label">Profile Image</span>
                                <span className="field-value">
                                    {employee.profile_image ? 'Available' : 'Not Available'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="detail-actions">
                        <button
                            className="action-btn edit-btn"
                            onClick={() => alert('Edit functionality (for display purpose)')}
                        >
                            Edit Employee
                        </button>
                        <button
                            className="action-btn delete-btn"
                            onClick={() => {
                                if (window.confirm(`Delete ${employee.employee_name}?`)) {
                                    alert('Deleted!');
                                    navigate('/');
                                }
                            }}
                        >
                            Delete Employee
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetail;
