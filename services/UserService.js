import {ApiInstance} from "../lib/axios";

const GetUsers = (query) => {
    let queryString = "";

    if (query) {
        queryString = `?${new URLSearchParams(query).toString()}`;
    }

    return ApiInstance.get(`/user${queryString}`);
}

const GetUserById = (id) => {
    return ApiInstance.get(`/user/${id}`);
}

const CreateUser = (params) => {
    return ApiInstance.post("/user", params);
}

const UpdateUser = (id, params) => {
    return ApiInstance.patch(`/user/${id}`, params);
}

const DeleteUser = (id) => {
    return ApiInstance.delete(`/user/${id}`);
}

export const UserService = {
    GetUsers,
    GetUserById,
    CreateUser,
    UpdateUser,
    DeleteUser
}