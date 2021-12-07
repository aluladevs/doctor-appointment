import {ApiInstance} from "../lib/axios";

const GetAvailable = (query) => {
    let queryString = "";

    if (query) {
        queryString = `?${new URLSearchParams(query).toString()}`;
    }

    return ApiInstance.get(`/available${queryString}`);
}

const GetAvailableById = (id) => {
    return ApiInstance.get(`/available/${id}`);
}

const GetAvailableByDoctor = (doctor) => {
    return ApiInstance.get(`/available/${doctor}`);
}

const GetAvailableByDoctorDate = (doctor, date) => {
    return ApiInstance.get(`/available/${doctor}/${date}`);
}


const CreateAvailable = (params) => {
    return ApiInstance.post("/available", params);
}

const UpdateAvailable = (doctor, date, params) => {
    return ApiInstance.patch(`/available/${doctor}/${date}`, params);
}

const DeleteAvailable = (id) => {
    return ApiInstance.delete(`/available/${id}`);
}

export const AvailableService = {
    GetAvailable,
    GetAvailableById,
    GetAvailableByDoctor,
    GetAvailableByDoctorDate,
    CreateAvailable,
    UpdateAvailable,
    DeleteAvailable
};