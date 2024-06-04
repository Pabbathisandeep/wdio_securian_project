import { DataTable } from '@cucumber/cucumber';

export class CustomDataTable {
  private dataTable: DataTable;

  constructor(dataTable: DataTable) {
    this.dataTable = dataTable;
  }

  public generateObject(): any {
    const hash = this.dataTable.rowsHash();
    const object = {};
    for (const key in hash) {
      const value = hash[key];
      const newValue = this.prepareValue(value);

      if (key.includes('.')) {
        const paths = key.split('.');
        this.createObjectStructure(object, paths);
        this.setObject(object, paths, newValue);
      } else {
        object[key] = newValue;
      }
    }

    return object;
  }

  private prepareValue(value: string): any {
    // TODO: Add float

    if (globalThis.scenarioContext.has(value)) {
      return globalThis.scenarioContext.get(value);
    }

    // if (value.startsWith('$') && value.endsWith('$')) {
    //   const trimValue = value.slice(1, -1);
    //   if (globalThis.scenarioContext.has(trimValue)) {
    //     return globalThis.scenarioContext.get(trimValue);
    //   }
    // }

    if (globalThis.featureContext.has(value)) {
      return globalThis.featureContext.get(value);
    }

    const isNumber = /^\d+$/.test(value);
    if (isNumber) {
      return parseInt(value);
    }

    if (value === 'true' || value === 'false') {
      return value === 'true';
    }

    return value;
  }

  private createObjectStructure(obj: any, paths: string[]) {
    let prevProperty = obj;
    const currentPropertyPaths: string[] = [];
    for (let i = 0; i < paths.length - 1; i++) {
      const currentPath = paths[i];

      currentPropertyPaths.push(currentPath);
      const property = this.getObjectProperty(obj, currentPropertyPaths);
      if (property !== undefined) {
        prevProperty = property;
        continue;
      }

      const nextPath = paths[i + 1];
      const isNextPathNumber = /^\d+$/.test(nextPath);
      if (isNextPathNumber) {
        prevProperty[currentPath] = [];
      } else {
        prevProperty[currentPath] = {};
      }

      prevProperty = this.getObjectProperty(obj, currentPropertyPaths);
    }
  }

  private setObject(obj: any, paths: string[], value: any) {
    const property = this.getObjectProperty(obj, paths.slice(0, -1));
    const lastPath = paths.getLastElement();
    this.setObjectProperty(property, lastPath, value);
  }

  private getObjectProperty(obj: any, paths: string[]) {
    let currentObj = obj;
    for (let i = 0; i < paths.length; i++) {
      const currentPath = paths[i];

      const isCurrentPathNumber = /^\d+$/.test(currentPath);
      if (isCurrentPathNumber) {
        const index = parseInt(currentPath);
        currentObj = currentObj[index];
      } else {
        currentObj = currentObj[currentPath];
      }
    }

    return currentObj;
  }

  private setObjectProperty(obj: any, propertyName: string, value: any) {
    const isPropertyNumber = /^\d+$/.test(propertyName);
    if (isPropertyNumber) {
      const index = parseInt(propertyName);
      obj[index] = value;
    } else {
      obj[propertyName] = value;
    }
  }
}
