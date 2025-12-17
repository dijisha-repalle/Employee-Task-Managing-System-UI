import React , {useState,useEffect} from "react";
import { getAllTasks,
    addTask,
    getTasksAssignedByManager,
    getTasksAssignedToEmployee,
    getUnassignedTasks,
    assignTask,
    deleteTask,

 } from "./TaskApi";
import TaskRow from './TaskRow';
import TaskForm from './TaskForm'


const TaskTable =()=>{

    const[task,setTask]=useState([]);
    const[loading,setLoading]=useState(true);
    const[editingTask,setEditingTask]=useState(null);
    const[newtask,setNewTask]=useState([]);
    const[offcanvas,setIsOffcanvasOpen]=useState(false);
    const[offcanvasMode,setOffcanvasMode]=useState(null);
    const[selectTask,setSelectedTask]=useState(null);
    

    useEffect(()=>{
        fetchAllTask();
    },[]);

const fetchAllTask= async()=>{
    try{
        setLoading(true);
        const response=await getAllTasks();
        setTask(response.data.content || response.data);
        
    }
    catch(error){
        console.error("Error fetching the tasks:",task);
    }
    finally{
        setLoading(false);
    }
};

    return (
        <div>
            <h2>Task List</h2>
            <p>Loading: {loading ? "Yes" : "No"}</p>
            <p>Tasks count: {task.length}</p>
        </div>
    );
}
export default TaskTable;