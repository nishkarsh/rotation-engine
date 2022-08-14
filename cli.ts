import { createReadStream } from 'fs';
import { argv, exit } from 'process';
import { Pipeline } from './src/pipeline';
import { CsvStreamParser } from './src/csv-stream-parser';
import { Validator } from './src/validator';
import { SingleElementRotator } from './src/single-element-rotator';
import { StreamProcessor } from './src/stream-processor';
import { CsvStreamFormatter } from './src/csv-stream-formatter';

const args = argv.splice(2)

if (args.length === 0) {
    const usageInstructions = "Usage:   node cli.js <input.csv> > <output.csv>";
    console.info(usageInstructions);
    exit(0);
}

const inputFilePath = args[0];

const streamProcessor = new StreamProcessor(new Validator(), new SingleElementRotator())

const pipeline = new Pipeline(
    createReadStream(inputFilePath),
    CsvStreamParser.create(),
    streamProcessor,
    CsvStreamFormatter.create(),
    process.stdout
);

pipeline.process();
