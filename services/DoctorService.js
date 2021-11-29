import {ApiInstance} from "../lib/axios";

const GetDoctors = (query) => {
    let queryString = "";

    if (query) {
        queryString = `?${new URLSearchParams(query).toString()}`;
    }

    return ApiInstance.get(`/doctor${queryString}`);
}

const GetDoctorById = (id) => {
    return ApiInstance.get(`/doctor/${id}`);
}

const CreateDoctor = (params) => {
    return ApiInstance.post("/doctor", params);
}

const UpdateDoctor = (id, params) => {
    return ApiInstance.patch(`/doctor/${id}`, params);
}

const DeleteDoctor = (id) => {
    return ApiInstance.delete(`/doctor/${id}`);
}

export const DoctorService = {
    GetDoctors,
    GetDoctorById,
    CreateDoctor,
    UpdateDoctor,
    DeleteDoctor
};