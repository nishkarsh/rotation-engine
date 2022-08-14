import { Validator } from '../src/validator';
import { anything, deepEqual, instance, mock, when } from 'ts-mockito';
import { StreamProcessor } from '../src/stream-processor';
import { SingleElementRotator } from '../src/single-element-rotator';
import { InputRow } from '../src/types/input-row';
import { expect } from 'chai';
import { OutputRow } from '../src/types/output-row';
import { Table } from '../src/table';

describe('stream-processor', () => {
    let mockedValidator: Validator;
    let mockedElementRotator: SingleElementRotator;

    let streamProcessor: StreamProcessor;

    beforeEach(async () => {
        mockedValidator = mock(Validator);
        mockedElementRotator = mock(SingleElementRotator);

        streamProcessor = new StreamProcessor(instance(mockedValidator), instance(mockedElementRotator));
    })

    afterEach(async () => {
        streamProcessor.end();
    })

    it('should transform stream of integer table to a valid output row', (done) => {
        const tableArray = [1, 2, 3, 4];
        const rotatedTableArray = [3, 1, 4, 2];
        const inputRow: InputRow = {
            id: '1',
            json: JSON.stringify(tableArray)
        }
        when(mockedValidator.isValidSquareTable(deepEqual(tableArray))).thenReturn(true);
        when(mockedElementRotator.rotate(deepEqual(new Table(tableArray))))
            .thenResolve(new Table(rotatedTableArray));

        streamProcessor.once('readable', () => {
            const outputRow: OutputRow = streamProcessor.read();
            expect(outputRow).to.deep.equal({ id: '1', json: rotatedTableArray, is_valid: "true" });
            done();
        })

        streamProcessor.write(inputRow);
    })

    it('should transform stream of invalid integer table to a proper output row', (done) => {
        const tableArray = [1, 2, 3];
        const inputRow: InputRow = {
            id: '2',
            json: JSON.stringify(tableArray)
        }
        when(mockedValidator.isValidSquareTable(deepEqual(tableArray))).thenReturn(false);

        streamProcessor.once('readable', () => {
            const outputRow: OutputRow = streamProcessor.read();
            expect(outputRow).to.deep.equal({ id: '2', json: [], is_valid: "false" });
            done();
        })

        streamProcessor.write(inputRow);
    })

    it('should emit error when an error occurs', (done) => {
        const tableArray = [1, 2, 3];
        const inputRow: InputRow = {
            id: '2',
            json: JSON.stringify(tableArray)
        }
        when(mockedValidator.isValidSquareTable(deepEqual(tableArray))).thenReturn(true);
        when(mockedElementRotator.rotate(anything())).thenReject(new Error('Oh no! Something unexpected happened!'));

        streamProcessor.once('error', (err) => {
            expect(err.message).to.equal('Oh no! Something unexpected happened!');
            done();
        })

        streamProcessor.write(inputRow);
    })
})