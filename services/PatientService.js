import {ApiInstance} from "../lib/axios";

const GetPatients = (query) => {
    let queryString = "";

    if (query) {
        queryString = `?${new URLSearchParams(query).toString()}`;
    }

    return ApiInstance.get(`/patient${queryString}`);
}

const GetPatientById = (id) => {
    return ApiInstance.get(`/patient/${id}`);
}

const CreatePatient = (params) => {
    return ApiInstance.post("/patient", params);
}

const UpdatePatient = (id, params) => {
    return ApiInstance.patch(`/patient/${id}`, params);
}

const DeletePatient = (id) => {
    return ApiInstance.delete(`/patient/${id}`);
}

export const PatientService = {
    GetPatients,
    GetPatientById,
    CreatePatient,
    UpdatePatient,
    DeletePatient
};