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
    return ApiInstance.get(`/available/doctor/${doctor}`);
}


const CreateAvailable = (params) => {
    return ApiInstance.post("/available", params);
}

const UpdateAvailable = (id, params) => {
    return ApiInstance.patch(`/available/${id}`, params);
}

const DeleteAvailable = (id) => {
    return ApiInstance.delete(`/available/${id}`);
}

export const AvailableService = {
    GetAvailable,
    GetAvailableById,
    GetAvailableByDoctor,
    CreateAvailable,
    UpdateAvailable,
    DeleteAvailable
};