import { Transform } from "stream";
import { Validator } from './validator';
import { SingleElementRotator } from './single-element-rotator';
import { InputRow, ParsedInputRow, toParsedInputRow } from '../types/input-row';
import { createInvalidOutputRow, createValidOutputRow, OutputRow } from '../types/output-row';
import { Table } from '../types/table';

const defaultOptions = {
    writableObjectMode: true,
    readableObjectMode: true,
    allowHalfOpen: false
};

export class StreamProcessor extends Transform {
    private readonly _validator: Validator;
    private readonly _singleElementRotator: SingleElementRotator;

    constructor(validator: Validator, singleElementRotator: SingleElementRotator) {
        super(defaultOptions)

        this._validator = validator;
        this._singleElementRotator = singleElementRotator;
    }

    async _transform(row: InputRow, _: any, callback: any) {
        callback(null, await this.process(toParsedInputRow(row)));
    }

    private async process(inputRow: ParsedInputRow): Promise<OutputRow> {
        if (this._validator.isValidSquareTable(inputRow.tableArray)) {
            const table = new Table(inputRow.tableArray);
            const rotatedTable = await this._singleElementRotator.rotate(table);

            return createValidOutputRow(inputRow.id, rotatedTable.tableArray);
        }

        return createInvalidOutputRow(inputRow.id);
    }
}