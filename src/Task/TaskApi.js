import axios from "axios";

const BASE_URL = "http://localhost:8080/task";

export const getAllTasks = async () => {
    return await axios.get(BASE_URL);
}

export const addTask = async (task) => {
    return await axios.post(BASE_URL, task);
}

export const getUnassignedTasks = async () => {
    return await axios.get(`${BASE_URL}/unassigned`); 
}

// Both are same - you can keep one
export const getTasksAssignedToEmployee = async (employeeId) => {
    return await axios.get(`${BASE_URL}/employee/${employeeId}`);
}

export const getTasksAssignedByManager = async (managerId) => {
    return await axios.get(`${BASE_URL}/assigned-by/${managerId}`);
}

export const assignTask = async (taskId, assignRequest) => {
    return await axios.put(`${BASE_URL}/assign/${taskId}`, assignRequest); 
}

export const deleteTask = async (taskId) => {
    return await axios.delete(`${BASE_URL}/${taskId}`); 
}

