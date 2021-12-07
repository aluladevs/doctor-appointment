import {ApiInstance} from "../lib/axios";

const GetSpecializations = (query) => {
    let queryString = "";

    if (query) {
        queryString = `?${new URLSearchParams(query).toString()}`;
    }

    return ApiInstance.get(`/specialization${queryString}`);
}

const GetSpecializationById = (id) => {
    return ApiInstance.get(`/specialization/${id}`);
}

const CreateSpecialization = (params) => {
    return ApiInstance.post("/specialization", params);
}

const UpdateSpecialization = (id, params) => {
    return ApiInstance.patch(`/specialization/${id}`, params);
}

const DeleteSpecialization = (id) => {
    return ApiInstance.delete(`/specialization/${id}`);
}

export const SpecializationService = {
    GetSpecializations,
    GetSpecializationById,
    CreateSpecialization,
    UpdateSpecialization,
    DeleteSpecialization
};