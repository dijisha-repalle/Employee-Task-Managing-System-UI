import axios from "axios";


const BASE_URL="http://localhost:8080/employee";


export const getAllEmployees = async()=>{
    return await axios.get(BASE_URL);

}

export const addEmployee = async(employee) =>{
    return await axios.post(BASE_URL,employee);
}

export const updateEmployee = async(id, employee) =>{
    return await axios.put(`${BASE_URL}/${id}`, employee);
}

export const deleteEmployee = async(id) =>{
    return await axios.delete(`${BASE_URL}/${id}`);
}

export const getAllEmployeeWithPagination = async(page, size, sortBy) => {
    return await axios.get(`${BASE_URL}/paginated`, {
        params: {
            page,
            size,
            sortBy
        }
    });
}