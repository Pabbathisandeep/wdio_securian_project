import { compareDesc, compareAsc } from 'date-fns';

interface Array<Date> {
  datesSortAsc(): Date[];
  datesSortDesc(): Date[];
}

if (!Array.prototype.datesSortAsc) {
  Array.prototype.datesSortAsc = function sortAsc(): Date[] {
    return this.sort(compareAsc);
  };
}

if (!Array.prototype.datesSortDesc) {
  Array.prototype.datesSortDesc = function sortDesc(): Date[] {
    return this.sort(compareDesc);
  };
}
