import {ApiInstance} from "../lib/axios";

const GetStaffs = (query) => {
    let queryString = "";

    if (query) {
        queryString = `?${new URLSearchParams(query).toString()}`;
    }

    return ApiInstance.get(`/staff${queryString}`);
}

const GetStaffById = (id) => {
    return ApiInstance.get(`/staff/${id}`);
}

const CreateStaff = (params) => {
    return ApiInstance.post("/staff", params);
}

const UpdateStaff = (id, params) => {
    return ApiInstance.patch(`/staff/${id}`, params);
}

const DeleteStaff = (id) => {
    return ApiInstance.delete(`/staff/${id}`);
}

export const StaffService = {
    GetStaffs,
    GetStaffById,
    CreateStaff,
    UpdateStaff,
    DeleteStaff
};