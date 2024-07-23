import type {BaseHttpClient} from "../interfaces/base-http-client.ts";
import axios, {type AxiosInstance} from "axios";
import {config} from "../configs/api-configs.ts";

export class HttpClient implements BaseHttpClient {

    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: config.baseURL,
            timeout: 10000,
            headers: {
                "Content-Type": "application/json",
            }
        })
    }

    async delete<T>(url: string, params?: any): Promise<T> {
        const response = await axios.delete(url, params);
        return response.data;
    }

    async get<T>(url: string, params?: any): Promise<T> {
        const response = await this.client.get<T>(url, { params });
        return response.data;
    }

    async post<T>(url: string, data: any): Promise<T> {
        const response = await this.client.post<T>(url, data);
        return response.data;
    }

    async put<T>(url: string, data: any): Promise<T> {
        const response = await this.client.put<T>(url, data);
        return response.data;
    }

}