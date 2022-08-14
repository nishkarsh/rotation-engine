import { pipeline, Readable, Transform, Writable } from 'stream';

export class Pipeline {
    private readonly _readableStream: Readable;
    private readonly _streamParser: Transform;
    private readonly _streamProcessor: Transform;
    private readonly _streamFormatter: Transform;
    private readonly _finalOutStream: Writable;

    constructor(readStream: Readable, streamParser: Transform,
                streamProcessor: Transform, streamFormatter: Transform, finalOutStream: Writable) {
        this._readableStream = readStream;
        this._streamParser = streamParser;
        this._streamProcessor = streamProcessor;
        this._streamFormatter = streamFormatter;
        this._finalOutStream = finalOutStream;
    }

    onProcessingComplete = (err: any): void => {
        if (err) {
            console.error('An error occurred during processing:', err);
        }
    };

    public process(): void {
        pipeline(this._readableStream, this._streamParser, this._streamProcessor, this._streamFormatter,
            this._finalOutStream, this.onProcessingComplete);
    }
}