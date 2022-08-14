export class Table {
    readonly tableArray: number[];
    readonly squareSize: number;

    constructor(tableArray: number[]) {
        this.tableArray = tableArray;
        this.squareSize = Math.sqrt(tableArray.length);
    }

    async getElementAtIndex(rowIndex: number, colIndex: number): Promise<number> {
        return this.tableArray[(rowIndex * this.squareSize) + colIndex]
    }

    async assignAtIndex(rowIndex: number, colIndex: number, newElement: number): Promise<number> {
        const currentElement = this.getElementAtIndex(rowIndex, colIndex);
        this.tableArray[(rowIndex * this.squareSize) + colIndex] = newElement;

        return currentElement;
    }
}