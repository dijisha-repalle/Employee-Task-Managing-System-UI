import React from "react";

const EmployeeForm = ({
  newEmployee,
  setNewEmployee,
  handleAddEmployee,
  editingEmployee,
}) => {
  const isEditing = Boolean(editingEmployee);

  return (
    <form onSubmit={handleAddEmployee} className="employee-form">
      <input
        type="text"
        placeholder="Name"
        value={newEmployee.name}
        onChange={(e) =>
          setNewEmployee({ ...newEmployee, name: e.target.value })
        }
        required
      />

      <input
        type="text"
        placeholder="Department"
        value={newEmployee.department}
        onChange={(e) =>
          setNewEmployee({ ...newEmployee, department: e.target.value })
        }
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={newEmployee.email}
        onChange={(e) =>
          setNewEmployee({ ...newEmployee, email: e.target.value })
        }
        required
      />

      <input
        type="role"
        placeholder="Role"
        value={newEmployee.role}
        onChange={(e) =>
          setNewEmployee({ ...newEmployee, role: e.target.value })
        }
        required
      />
        <input
        type="date"
        placeholder="Joining Date"
        value={newEmployee.joiningDate}
        onChange={(e) =>
          setNewEmployee({ ...newEmployee, joiningDate: e.target.value })
        }
        required
      />

      <button type="submit" className="primary-btn">
        {isEditing ? "Update Employee" : "Save Employee"}
      </button>
    </form>
  );
};

export default EmployeeForm;
