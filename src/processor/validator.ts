export class Validator {
    public isValidSquareTable(tableArray: number[]): boolean {
        return Number.isInteger(Math.sqrt(tableArray.length));
    }
}