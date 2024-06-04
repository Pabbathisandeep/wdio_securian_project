import XLSX from "xlsx";

export class ExcelWorkbook {

    static read(filepath: string): XLSX.WorkBook {
        return XLSX.readFile(filepath);
    }

    static getSheet(workbook: XLSX.WorkBook, sheetName: string): XLSX.WorkSheet {
        return workbook.Sheets[sheetName];
    }

    static getFirstSheet(workbook: XLSX.WorkBook): XLSX.WorkSheet {
        const firstSheetName = workbook.SheetNames[0];
        return workbook.Sheets[firstSheetName];
    }

    static replaceDataInCell(pathToFile: string, workbook: XLSX.WorkBook,workSheet: XLSX.WorkSheet, cellCoords: string, newValue: string) {
        workSheet[cellCoords].v = newValue;
        XLSX.writeFile(workbook, pathToFile);
    }
}