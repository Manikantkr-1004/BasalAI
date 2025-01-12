const API = 'http://localhost:8000'

export const fetchTasks = async ({status, priority, sort, own}) => {
    try {
        const response = await fetch(`${API}/task/tasks?status=${status}&priority=${priority}&sort=${sort}&own=${own}`, {
            method: "GET",
            credentials: "include",
        });
        const data = await response.json();
        if(!response.ok){
            return {message: data?.message || 'Internal Error', error: true}
        }
        return data;
    } catch (error) {
        return null;
    }
};

export const createTask = async (taskData) => {
    try {
        const response = await fetch(`${API}/task/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(taskData),
        });
        const data = await response.json();
        if(!response.ok){
            return {message: data?.message || 'Internal Error', error: true}
        }
        return data;
    } catch (error) {
        return null;
    }
};

export const updateTask = async ({id, taskData}) => {
    try {
        const response = await fetch(`${API}/task/tasks/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(taskData),
        });
        const data = await response.json();
        if(!response.ok){
            return {message: data?.message || 'Internal Error', error: true}
        }
        return data;
    } catch (error) {
        return null;
    }
};

export const deleteTask = async (id) => {
    try {
        const response = await fetch(`${API}/task/tasks/${id}`, {
            method: "DELETE",
            credentials: "include",
        });
        const data = await response.json();
        if(!response.ok){
            return {message: data?.message || 'Internal Error', error: true}
        }
        return data;
    } catch (error) {
        return null;
    }
};

export const userRegister = async (userData) => {
    try {
        const response = await fetch(`${API}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(userData),
        });
        const data = await response.json();
        if(!response.ok){
            return {message: data?.message || 'Internal Error', error: true}
        }
        return data;
    } catch (error) {
        return null;
    }
};

export const userLogin = async (loginData) => {
    try {
        const response = await fetch(`${API}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(loginData),
        });

        
        const data = await response.json();
        if(!response.ok){
            return {message: data?.message || 'Internal Error', error: true}
        }
        return data;
    } catch (error) {
        return null;
    }
};

export const userCheck = async () => {
    try {
        const response = await fetch(`${API}/auth/check`, {
            method: "GET",
            credentials: "include",
        });
        const data = await response.json();
        if(!response.ok){
            return {message: data?.message || 'Internal Error', error: true}
        }
        return data;
    } catch (error) {
        return null;
    }
};

export const userLogout = async () => {
    try {
        const response = await fetch(`${API}/auth/logout`, {
            method: "POST",
            credentials: "include",
        });
        const data = await response.json();
        if(!response.ok){
            return {message: data?.message || 'Internal Error', error: true}
        }
        return data;
    } catch (error) {
        return null;
    }
};
