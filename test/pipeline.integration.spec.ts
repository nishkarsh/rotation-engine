import { createReadStream, readFileSync } from 'fs';
import { Pipeline } from '../src/pipeline';
import { StreamProcessor } from '../src/processor/stream-processor';
import { Validator } from '../src/processor/validator';
import { SingleElementRotator } from '../src/processor/single-element-rotator';
import { PassThrough } from 'stream';
import { expect } from 'chai';
import { createCsvFormatter } from '../src/csv-formatter';
import { createCsvParser } from '../src/csv-parser';

describe('table processing pipeline (integration)', () => {
    it('should process csv file and return proper output', (done) => {
        const streamProcessor = new StreamProcessor(new Validator(), new SingleElementRotator())
        const source = createReadStream("samples/sample-input.csv");
        const destination = new PassThrough({ writableObjectMode: true, readableObjectMode: true });

        let actualOutput = "";
        destination.on('readable', () => {
            actualOutput = readOutput(destination, actualOutput);
        });

        destination.on('end', () => {
            const expectedOutput = readFileSync('samples/sample-output.csv', 'utf8');
            expect(actualOutput).to.equal(expectedOutput);
            done();
        });

        const pipeline = new Pipeline(source,
            createCsvParser(),
            streamProcessor,
            createCsvFormatter(),
            destination);

        pipeline.process();
    });

    const readOutput = (destination: any, actualOutput: string): string => {
        let chunk;
        while (null !== (chunk = destination.read())) {
            actualOutput = actualOutput + chunk;
        }
        return actualOutput;
    }
})