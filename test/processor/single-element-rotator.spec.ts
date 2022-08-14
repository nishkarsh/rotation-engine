import { expect } from 'chai';
import { SingleElementRotator } from '../../src/processor/single-element-rotator';
import { Table } from '../../src/types/table';

describe('single-element-rotator', () => {
    const elementRotator = new SingleElementRotator();

    describe('#rotate()', () => {
        it('should return empty table when attempting to rotate empty table', async () => {
            const rotatedTable = await elementRotator.rotate(new Table([]));
            expect(rotatedTable.tableArray).to.be.deep.equal([])
        })

        it('should leave the table intact when only one element present', async () => {
            const rotatedTable = await elementRotator.rotate(new Table([1]));
            expect(rotatedTable.tableArray).to.be.deep.equal([1])
        })

        it('should rotate table of size 4', async () => {
            const rotatedTable = await elementRotator.rotate(new Table([1, 2, 3, 4]));
            expect(rotatedTable.tableArray).to.be.deep.equal([3, 1, 4, 2])
        })

        it('should rotate table of size 9', async () => {
            const rotatedTable = await elementRotator.rotate(new Table([1, 2, 3, 4, 5, 6, 7, 8, 9]));
            expect(rotatedTable.tableArray).to.be.deep.equal([4, 1, 2, 7, 5, 3, 8, 9, 6])
        })

        it('should rotate table of size 16', async () => {
            const table = new Table([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);

            const rotatedTable = await elementRotator.rotate(table);

            expect(rotatedTable.tableArray).to.be.deep.equal([5, 1, 2, 3, 9, 10, 6, 4, 13, 11, 7, 8, 14, 15, 16, 12])
        })

        it('should rotate table of size 25', async () => {
            const table = new Table([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]);

            const rotatedTable = await elementRotator.rotate(table);

            const rotatedTableArray = [6, 1, 2, 3, 4, 11, 12, 7, 8, 5, 16, 17, 13, 9, 10, 21, 18, 19, 14, 15, 22, 23, 24, 25, 20];
            expect(rotatedTable.tableArray).to.be.deep.equal(rotatedTableArray)
        })
    })
})