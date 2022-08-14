import { Options, parse } from "csv-parse";
import { Transform } from "stream";

const defaultParserOptions = {
    delimiter: ",",
    columns: true
}

export class CsvStreamParser {
    public static create(options: Options = defaultParserOptions): Transform {
        return parse(options);
    }
}