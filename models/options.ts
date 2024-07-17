export interface Choice {
    name: string;
    value: any;
    description?: string;
    disabled?: boolean
}

export interface Options {
    message: string,
    choices: Choice[],
    pageSize?: number
}

export interface MultiSelectOptions {
    message: string,
    options: Choice[],
    placeholder?: string
}