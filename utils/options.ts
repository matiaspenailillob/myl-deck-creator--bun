import type {MultiSelectOptions, Options} from "../models/options.ts";

export const optionsBuilder = ( { message, choices = [], pageSize } : Options ) => {
    return {
        message,
        choices,
        pageSize
    }
}

export const multiSelectOptionsBuilder = ( { message, options = [], placeholder } : MultiSelectOptions ) => {
    return {
        message,
        options,
        placeholder
    }
}