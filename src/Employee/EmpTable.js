import React, { useEffect, useState } from "react";
import {
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getAllEmployeeWithPagination,
} from "./employeApi";
import EmployeeForm from "./EmployeeForm";
import EmployeeRow from "./EmployeeRow";
import "./EmpTable.css";

const blankEmployee = {
  name: "",
  email: "",
  department: "",
  joiningDate: "",
  role: "",
};

const EmpTable = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [newEmployee, setNewEmployee] = useState(blankEmployee);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [offcanvasMode, setOffcanvasMode] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [sortBy, setSortBy] = useState("id");
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    fetchEmployees();
  }, [currentPage, pageSize, sortBy]);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await getAllEmployeeWithPagination(currentPage, pageSize, sortBy);
      // Spring Page response structure
      setEmployees(response.data.content || response.data);
      setTotalPages(response.data.totalPages || 0);
      setTotalElements(response.data.totalElements || 0);
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      if (editingEmployee) {
        const response = await updateEmployee(editingEmployee.id, newEmployee);
        alert("Employee updated successfully!");
        // Refresh the current page after updating
        fetchEmployees();
      } else {
        const response = await addEmployee(newEmployee);
        alert("Employee added successfully!");
        // Refresh the current page after adding
        fetchEmployees();
      }
      closeOffcanvas();
    } catch (error) {
      console.error("Error saving employee:", error);
      alert(
        editingEmployee ? "Failed to update employee." : "Failed to add employee."
      );
    }
  };

  const confirmDelete = async () => {
    if (!selectedEmployee) return;
    try {
      await deleteEmployee(selectedEmployee.id);
      alert("Employee deleted!");
      // If current page becomes empty after deletion, go to previous page
      if (employees.length === 1 && currentPage > 0) {
        setCurrentPage(currentPage - 1);
      } else {
        fetchEmployees();
      }
      closeOffcanvas();
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Failed to delete employee.");
    }
  };

  const openOffcanvas = (mode, employee = null) => {
    setOffcanvasMode(mode);
    setSelectedEmployee(employee);

    if (mode === "add") {
      setEditingEmployee(null);
      setNewEmployee(blankEmployee);
    }

    if (mode === "edit" && employee) {
      setEditingEmployee(employee);
      setNewEmployee({
        name: employee.name || "",
        email: employee.email || "",
        department: employee.department || "",
        joiningDate: employee.joiningDate || "",
      });
    }

    setIsOffcanvasOpen(true);
  };

  const closeOffcanvas = () => {
    setIsOffcanvasOpen(false);
    setOffcanvasMode(null);
    setSelectedEmployee(null);
    setEditingEmployee(null);
    setNewEmployee(blankEmployee);
  };

  const handleView = (emp) => openOffcanvas("view", emp);
  const handleEdit = (emp) => openOffcanvas("edit", emp);
  const handleDeleteClick = (emp) => openOffcanvas("delete", emp);
  const handleAddClick = () => openOffcanvas("add");

  // Pagination handlers
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(0); 
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(0); 
  };

  const getOffcanvasTitle = () => {
    switch (offcanvasMode) {
      case "add":
        return "Add Employee";
      case "edit":
        return "Edit Employee";
      case "view":
        return "Employee Details";
      case "delete":
        return "Delete Employee";
      default:
        return "";
    }
  };

  const renderOffcanvasContent = () => {
    if (!offcanvasMode) return null;

    if (offcanvasMode === "view" && selectedEmployee) {
      return (
        <div className="employee-details">
          <p>
            <strong>ID:</strong> {selectedEmployee.id}
          </p>
          <p>
            <strong>Name:</strong> {selectedEmployee.name}
          </p>
          <p>
            <strong>Email:</strong> {selectedEmployee.email}
          </p>
          <p>
            <strong>Department:</strong> {selectedEmployee.department}
          </p>
          <p>
            <strong>Joining Date:</strong> {selectedEmployee.joiningDate}
          </p>
        </div>
      );
    }

    if (offcanvasMode === "add" || offcanvasMode === "edit") {
      return (
        <EmployeeForm
          newEmployee={newEmployee}
          setNewEmployee={setNewEmployee}
          handleAddEmployee={handleAddEmployee}
          editingEmployee={editingEmployee}
        />
      );
    }

    if (offcanvasMode === "delete" && selectedEmployee) {
      return (
        <div className="delete-confirmation">
          <p>
            Are you sure you want to delete{" "}
            <strong>{selectedEmployee.name}</strong>?
          </p>
          <div className="offcanvas-footer">
            <button className="delete-btn" onClick={confirmDelete}>
              Delete
            </button>
            <button className="secondary-btn" onClick={closeOffcanvas}>
              Cancel
            </button>
          </div>
        </div>
      );
    }

    return null;
  };

  if (loading) {
    return (
      <div className="emp-container">
        <p>Loading employees...</p>
      </div>
    );
  }

  return (
    <div className="emp-container">
      <div className="table-header">
        <h2>Employee List</h2>
        <button className="add-btn" onClick={handleAddClick}>
          Add Employee
        </button>
      </div>

      <table className="emp-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Joining Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((emp) => (
              <EmployeeRow
                key={emp.id}
                emp={emp}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
              />
            ))
          ) : (
            <tr>
              <td colSpan="6">No employees found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination-container">
        <div className="pagination-info">
          <span>
            Showing {employees.length > 0 ? currentPage * pageSize + 1 : 0} to{" "}
            {Math.min((currentPage + 1) * pageSize, totalElements)} of{" "}
            {totalElements} employees
          </span>
        </div>

        <div className="pagination-controls">
          <div className="pagination-settings">
            <label htmlFor="pageSize">Items per page:</label>
            <select
              id="pageSize"
              value={pageSize}
              onChange={handlePageSizeChange}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>

            <label htmlFor="sortBy">Sort by:</label>
            <select id="sortBy" value={sortBy} onChange={handleSortChange}>
              <option value="id">ID</option>
              <option value="name">Name</option>
              <option value="email">Email</option>
              <option value="department">Department</option>
              <option value="joiningDate">Joining Date</option>
            </select>
          </div>

          <div className="pagination-buttons">
            <button
              className="pagination-btn"
              onClick={() => handlePageChange(0)}
              disabled={currentPage === 0}
            >
              First
            </button>
            <button
              className="pagination-btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
            >
              Previous
            </button>

            <span className="pagination-page-info">
              Page {currentPage + 1} of {totalPages || 1}
            </span>

            <button
              className="pagination-btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages - 1}
            >
              Next
            </button>
            <button
              className="pagination-btn"
              onClick={() => handlePageChange(totalPages - 1)}
              disabled={currentPage >= totalPages - 1}
            >
              Last
            </button>
          </div>
        </div>
      </div>

      {isOffcanvasOpen && (
        <div className="offcanvas-backdrop" onClick={closeOffcanvas}>
          <div
            className="offcanvas-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="offcanvas-header">
              <h3>{getOffcanvasTitle()}</h3>
              <button
                className="offcanvas-close"
                onClick={closeOffcanvas}
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            <div className="offcanvas-body">{renderOffcanvasContent()}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmpTable;
