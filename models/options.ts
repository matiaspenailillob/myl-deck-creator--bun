export interface Choice {
    name: string;
    value: string;
    description?: string;
    disabled?: boolean
}

export interface Options {
    message: string,
    choices: Choice[],
    pageSize?: number
}