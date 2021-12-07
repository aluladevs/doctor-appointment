import {ApiInstance} from "../lib/axios";

const UploadImage = (params) => {
    const formData = new FormData();
    for (let i = 0; i < params.length; i++) {
        formData.append("image", params[i]);
    }

    for (const key of formData.entries()) {
        console.log(key[0] + ', ' + key[1]);
    }

    return ApiInstance.post('/upload', formData);
};

export const OtherService = {
    UploadImage
};