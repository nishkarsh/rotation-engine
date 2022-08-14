import { expect } from 'chai';
import { PassThrough } from 'stream';
import { Pipeline } from '../src/pipeline';

describe('pipeline', () => {
    describe('#process', () => {
        it('should create a pipeline with provided streams', (done) => {
            const source = new PassThrough();
            source.push("An Important Message");

            const destination = new PassThrough();
            destination.once('readable', () => {
                const message = destination.read();
                expect(message.toString()).to.equal('An Important Message');
                done();
            });

            const pipeline = new Pipeline(source, new PassThrough(), new PassThrough(), new PassThrough(), destination);
            pipeline.process()
        })
    })
})