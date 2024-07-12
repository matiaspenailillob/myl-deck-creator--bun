import type {Options} from "../models/options.ts";

export const optionsBuilder = ( { message, choices = [], pageSize } : Options ) => {
    return {
        message,
        choices,
        pageSize
    }
}