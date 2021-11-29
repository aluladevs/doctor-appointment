import {ApiInstance} from "../lib/axios";

const GetDepartments = (query) => {
    let queryString = "";

    if (query) {
        queryString = `?${new URLSearchParams(query).toString()}`;
    }

    return ApiInstance.get(`/department${queryString}`);
}

const GetDepartmentById = (id) => {
    return ApiInstance.get(`/department/${id}`);
}

const CreateDepartment = (params) => {
    return ApiInstance.post("/department", params);
}

const UpdateDepartment = (id, params) => {
    return ApiInstance.patch(`/department/${id}`, params);
}

const DeleteDepartment = (id) => {
    return ApiInstance.delete(`/department/${id}`);
}

export const DepartmentService = {
    GetDepartments,
    GetDepartmentById,
    CreateDepartment,
    UpdateDepartment,
    DeleteDepartment
};