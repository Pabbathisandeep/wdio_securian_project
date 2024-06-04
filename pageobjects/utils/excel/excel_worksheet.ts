import XLSX from "xlsx";

export class ExcelWorksheet {

    static toJson(worksheet: XLSX.WorkSheet): any[] {
        return XLSX.utils.sheet_to_json(worksheet, { defval: '' });
    }

}