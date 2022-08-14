import { Options, stringify } from "csv-stringify";
import { Transform } from "stream";
import { columns } from './types/output-row';

const defaultFormatterOptions = {
    header: true,
    quoted_match: /^\[.*]$/,
    columns: columns
}

export const createCsvFormatter = (options: Options = defaultFormatterOptions): Transform => {
    return stringify(options);
}