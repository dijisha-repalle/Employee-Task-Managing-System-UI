import React, { useEffect, useState } from "react";
import { deleteTask, getAllTasks, getUnassignedTasks } from "./TaskApi";
import TaskRow from "./TaskRow";
import "./TaskTable.css";

const TaskTable = () => {
  const [task, setTask] = useState([]);
  const [unassignedTasks, setUnassignedTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllTask();
    getAllUnassignedTasks();
  }, []);

  const fetchAllTask = async () => {
    try {
      setLoading(true);
      const response = await getAllTasks();
      setTask(response.data?.content ?? response.data ?? []);
    } catch (error) {
      console.error("Error fetching the tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const getAllUnassignedTasks = async () => {
    try {
      setLoading(true);
      const response = await getUnassignedTasks();
      setUnassignedTasks(response.data?.content ?? response.data ?? []);
    } catch (error) {
      console.error("Unable to fetch the Unassigned tasks:", error);
    } finally {
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
 

};

export default TaskTable;