import {ApiInstance} from "../lib/axios";

const GetAppointments = (query) => {
    let queryString = "";

    if (query) {
        queryString = `?${new URLSearchParams(query).toString()}`;
    }

    return ApiInstance.get(`/appointment${queryString}`);
}

const GetAppointmentById = (id) => {
    return ApiInstance.get(`/appointment/${id}`);
}

const CreateAppointment = (params) => {
    return ApiInstance.post("/appointment", params);
}

const UpdateAppointment = (id, params) => {
    return ApiInstance.patch(`/appointment/${id}`, params);
}

const DeleteAppointment = (id) => {
    return ApiInstance.delete(`/appointment/${id}`);
}

export const AppointmentService = {
    GetAppointments,
    GetAppointmentById,
    CreateAppointment,
    UpdateAppointment,
    DeleteAppointment
};