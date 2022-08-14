import { createReadStream } from 'fs';
import { argv, exit } from 'process';
import { Pipeline } from './src/pipeline';
import { createCsvParser } from './src/csv-parser';
import { Validator } from './src/processor/validator';
import { SingleElementRotator } from './src/processor/single-element-rotator';
import { StreamProcessor } from './src/processor/stream-processor';
import { createCsvFormatter } from './src/csv-formatter';

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
    createCsvParser(),
    streamProcessor,
    createCsvFormatter(),
    process.stdout
);

pipeline.process();
