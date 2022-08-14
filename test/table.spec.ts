import { expect } from 'chai';
import { Table } from '../src/table';

describe("table", () => {
    it("should store size as square root of total element length", () => {
        expect(new Table([]).squareSize).to.equal(0);
        expect(new Table([1]).squareSize).to.equal(1);
        expect(new Table([1, 2, 3, 4]).squareSize).to.equal(2);
    })

    describe('#getElementAtIndex()', () => {
        it('should get correct element from given index considering elements in a square table', async () => {
            const table = new Table([1, 2, 3, 4]);

            expect(await table.getElementAtIndex(0, 0)).to.equal(1);
            expect(await table.getElementAtIndex(0, 1)).to.equal(2);
            expect(await table.getElementAtIndex(1, 1)).to.equal(4);
            expect(await table.getElementAtIndex(1, 0)).to.equal(3);
        })
    });

    describe('#assignAtIndex', () => {
        it('should assign given element at index considering a square table', async () => {
            const table = new Table([1, 2, 3, 4]);

            await table.assignAtIndex(0, 1, 10);

            expect(table).to.deep.equal(new Table([1, 10, 3, 4]));
        })

        it('should return replaced element', async () => {
            const table = new Table([1, 2, 3, 4]);

            const replacedElement = await table.assignAtIndex(0, 1, 10);

            expect(replacedElement).to.equal(2);
        })
    });
})