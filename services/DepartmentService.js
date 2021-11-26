import {ApiInstance} from "../lib/axios";

const GetDepartments = (query) => {
    let queryString = "";

    if (query) {
        queryString = `?${new URLSearchParams(query).toString()}`;
    }

    return ApiInstance.get(`/department${queryString}`);
}

export const DepartmentService = {
    GetDepartments
}