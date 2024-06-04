import lodashClonedeep from 'lodash.clonedeep';
import './string_extensions';
var _ = require('lodash');

export class ObjectUtils {
  private static maxLines = 20;

  public static deepCopy(obj: any): any {
    return lodashClonedeep(obj);
  }

  public static objToString(obj: any, collapse = true): string {
    let str = JSON.stringify(obj, ObjectUtils.getCircularReplacer(), 2);
    if (str === undefined) return '';

    if (collapse) {
      const lines = str.lines();
      if (lines.length > ObjectUtils.maxLines) {
        const firstLines = lines.slice(0, 9);
        const lastLines = lines.slice(-9);
        const infoLine = `-----------------------------------------\nToo many lines. Some lines are collapsed.\n-----------------------------------------`;
        str = [...firstLines, infoLine, ...lastLines].join('\n');
      }
    }

    return str;
  }

  private static getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };

  public static cast<T>(genericObj: object, obj: T): T {
    return genericObj && Object.assign(obj, genericObj);
  }

  public static assign(dest_object: any, src_obj: any) {
    return _.assignIn(dest_object, src_obj);
  }
}
