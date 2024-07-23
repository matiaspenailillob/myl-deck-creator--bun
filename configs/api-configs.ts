import {cardEndpoints} from "./card-endpoints.ts";

export const config = {
    baseURL: 'https://api.myl.cl/',
    ...cardEndpoints
}