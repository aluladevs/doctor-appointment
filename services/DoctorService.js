import {ApiInstance} from "../lib/axios";

const GetDoctors = (query) => {
    let queryString = "";

    if (query) {
        queryString = `?${new URLSearchParams(query).toString()}`;
    }

    return ApiInstance.get(`/doctor${queryString}`);
}

const GetDoctorByUid = (uid) => {
    return ApiInstance.get(`/doctor/${uid}`);
}

const CreateDoctor = (params) => {
    return ApiInstance.post("/doctor", params);
}

const UpdateDoctor = (uid, params) => {
    return ApiInstance.patch(`/doctor/${uid}`, params);
}

const DeleteDoctor = (id) => {
    return ApiInstance.delete(`/doctor/${id}`);
}

export const DoctorService = {
    GetDoctors,
    GetDoctorByUid,
    CreateDoctor,
    UpdateDoctor,
    DeleteDoctor
};