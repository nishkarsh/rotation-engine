import { Validator } from '../src/validator';
import { expect } from 'chai';

describe('validator', () => {
    let validator = new Validator();

    describe('#isValid()', () => {
        it('should return true when empty array', () => {
            expect(validator.isValidSquareTable([])).to.be.true
        })

        it('should return false when number of elements is not a perfect square', () => {
            expect(validator.isValidSquareTable([1, 2])).to.be.false
            expect(validator.isValidSquareTable([1, 2, 3])).to.be.false
            expect(validator.isValidSquareTable([1, 2, 3, 8, 3])).to.be.false
        })

        it('should return true when number of elements is a perfect square', () => {
            expect(validator.isValidSquareTable([1])).to.be.true
            expect(validator.isValidSquareTable([1, 2, 3, 4])).to.be.true
            expect(validator.isValidSquareTable([1, 2, 3, 4, 5, 6, 7, 8, 9])).to.be.true
            expect(validator.isValidSquareTable([1, 2, 3, 4, 5, 6, 7, 8, 9, 19, 21, 53, 12, 4, 7, 1])).to.be.true
        })
    })
})