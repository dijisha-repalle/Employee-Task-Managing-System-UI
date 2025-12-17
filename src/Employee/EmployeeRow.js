import React from "react";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";


const EmployeeRow = ({ emp, onView, onEdit, onDelete }) => {
  return (
    <tr>
      <td>{emp.id}</td>
      <td>{emp.name}</td>
      <td>{emp.email}</td>
      <td>{emp.department}</td>
      <td>{emp.joiningDate}</td>
      <td>{emp.role}</td>
      <td style={{ display: "flex", gap: "12px" }}>
        {/* View Icon */}
        <FiEye
          onClick={() => onView(emp)}
          className="icon view-icon"
          title="View"
        />

        {/* Edit Icon */}
        <FiEdit
          onClick={() => onEdit(emp)}
          className="icon edit-icon"
          title="Edit"
        />

        {/* Delete Icon */}
        <FiTrash2
          onClick={() => onDelete(emp.id)}
          className="icon delete-icon"
          title="Delete"
        />
      </td>
    </tr>
  );
};

export default EmployeeRow;