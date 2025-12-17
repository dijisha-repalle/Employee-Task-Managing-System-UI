import React from "react";

const TaskForm = ({
    newTaskForm,
    setNewTaskForm,
    handleAddTask,
    editingTask,

})=>{
    const isEditing = Boolean(editingTask);
    return(
        <form onSubmit={handleAddTask} className="text-form">
         <input
         type="text"
         placeholder="Title"
         value={newTaskForm.title}
         onChange={(e)=>
            setNewTaskForm({...newTaskForm,title: e.target.value})

         }
         required
         />
         <input
         type="text"
         placeholder="Description"
         value={newTaskForm.description}
         onChange={(e)=>
            setNewTaskForm({...newTaskForm,description: e.target.value})

         }
         required
         
         />
          <input
         type="text"
         placeholder="DueDate"
         value={newTaskForm.dueDate}
         onChange={(e)=>
            setNewTaskForm({...newTaskForm,dueDate: e.target.value})

         }
         required
         
         />
          <input
         type="text"
         placeholder="Status"
         value={newTaskForm.status}
         onChange={(e)=>
            setNewTaskForm({...newTaskForm,status: e.target.value})

         }
         required
         
         />
          <input
         type="text"
         placeholder="AssignedTo"
         value={newTaskForm.assignedTo}
         onChange={(e)=>
            setNewTaskForm({...newTaskForm,assignedTo: e.target.value})

         }
         required
         
         />
          <input
         type="text"
         placeholder="AssignedBy"
         value={newTaskForm.assignedBy}
         onChange={(e)=>
            setNewTaskForm({...newTaskForm,assignedBy: e.target.value})

         }
         required
         
         />
          <input
         type="text"
         placeholder="Priority"
         value={newTaskForm.priority}
         onChange={(e)=>
            setNewTaskForm({...newTaskForm,priority: e.target.value})

         }
         required
         
         />
         <button type="submit" className="primary-btn">
        {isEditing ? "Update Task" : "Save Task"}
      </button>
        </form>

    );
    

}
export default TaskForm;
