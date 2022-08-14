import { Options, parse } from "csv-parse";
import { Transform } from "stream";

const defaultParserOptions = {
    delimiter: ",",
    columns: true
}

export const createCsvParser = (options: Options = defaultParserOptions): Transform => {
    return parse(options);
}
