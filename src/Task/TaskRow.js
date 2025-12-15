import React from "react";
import { FiEye,FiEdit,FiTrash2 } from "react-icons/fi";

const TaskRow = ({taskobj,onEdit,onView,onDelete})=>{

    return(
        <tr>
            <td>{taskobj.id}</td>
            <td>{taskobj.title}</td>
            <td>{taskobj.description}</td>
            <td>{taskobj.dueDate}</td>
            <td>{taskobj.status}</td>
            <td>{taskobj.assignedBy}</td>
            <td>{taskobj.assignedTo}</td>
            <td style={{ display: "flex", gap: "12px" }}>
                <FiEye
                          onClick={() => onView(taskobj)}
                          className="icon view-icon"
                          title="View"
                />
                

                
                <FiEdit
                onClick={()=> onEdit(taskobj)}
                className="icon edit-icon"
                title="Edit"
                />
                <FiTrash2
                onClick={()=>onDelete(taskobj?.id)}
                className="icon delete-icon"
                title="Delete"
                />

               
            </td>

        </tr>
    );

};


export default TaskRow;