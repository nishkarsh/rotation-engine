import { Table } from './table';

export class SingleElementRotator {
    public async rotate(table: Table): Promise<Table> {
        const squareSize = table.squareSize;
        let focusedRow = 0, focusedCol = 0;
        let rowBoundary = squareSize, colBoundary = squareSize;

        let previous: number;

        while (focusedRow < rowBoundary) {
            if (focusedRow + 1 == rowBoundary)
                break;

            previous = await table.getElementAtIndex(focusedRow + 1, focusedCol);

            for (let curCol = focusedCol; curCol < colBoundary; curCol++) {
                previous = await table.assignAtIndex(focusedRow, curCol, previous);
            }
            focusedRow++;

            for (let curRow = focusedRow; curRow < rowBoundary; curRow++) {
                previous = await table.assignAtIndex(curRow, colBoundary - 1, previous);
            }
            colBoundary--;

            for (let curCol = colBoundary - 1; curCol >= focusedCol; curCol--) {
                previous = await table.assignAtIndex(rowBoundary - 1, curCol, previous);
            }
            rowBoundary--;

            for (let curRow = rowBoundary - 1; curRow >= focusedRow; curRow--) {
                previous = await table.assignAtIndex(curRow, focusedCol, previous);
            }
            focusedCol++;
        }

        return table;
    }
}
