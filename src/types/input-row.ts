export type InputRow = {
    id: string,
    json: string
}

export type ParsedInputRow = {
    id: string;
    tableArray: number[];
}

export const toParsedInputRow = (row: InputRow): ParsedInputRow => {
    return {
        id: row.id,
        tableArray: JSON.parse(row.json)
    }
}