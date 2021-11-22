import axios from "axios";

export const ENVIRONMENT = process.env.NODE_ENV;

let dev = ENVIRONMENT === "development";

export const DEV_URL = process.env.DEV_URL;
export const PROD_URL = process.env.PROD_URL;

export const API_URL = dev ? DEV_URL : PROD_URL;

export const ApiInstance = axios.create({
    baseURL: `${API_URL}/api/`
});