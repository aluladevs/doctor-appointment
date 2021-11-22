import {ApiInstance} from "../lib/axios";

const GetUsers = (query) => {
    let queryString = "";

    if (query) {
        queryString = `?${new URLSearchParams(query).toString()}`;
    }

    return ApiInstance.get(`/user${queryString}`);
}

export const UserService = {
    GetUsers
}