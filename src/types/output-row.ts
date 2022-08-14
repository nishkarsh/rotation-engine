export const columns = ['id', 'json', 'is_valid'];

export type OutputRow = {
    id: string;
    json: number[];
    is_valid: string;
}

export const createValidOutputRow = (id: string, rotatedArray: number[]): OutputRow => {
    return { id, json: rotatedArray, is_valid: "true" }
}

export const createInvalidOutputRow = (id: string): OutputRow => {
    return { id, json: [], is_valid: "false" }
}