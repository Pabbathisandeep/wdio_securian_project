var _ = require('lodash');
const diff = require('deep-object-diff').diff;

export class CompareUtils {
  static equals(actual: any, expected: any): boolean {
    return _.isEqual(actual, expected);
  }

  static equalsWithoutOrder(actual: any, expected: any): boolean {
    return _.isEqual(actual.sort(), expected.sort());
  }

  public static contains(actualArray: any[], expected: any): boolean {
    return actualArray.some((actual) => _.isEqual(actual, expected));
  }

  public static allValuesInArrayEqual(
    actualArray: any[],
    expectedObj: any
  ): boolean {
    return _.difference(actualArray, [expectedObj]).length === 0;
  }

  public static allValuesInArrayAreUnique(
    actualArray: any[]
  ): boolean {
    return _.uniq(actualArray).length === actualArray.length;
  }

  public static equalsByProperties(
    actualObj: object,
    expectedObj: object,
    properties: string | string[]
  ): boolean {
    const newActualObj = _.pick(actualObj, properties);
    const newExpectedObj = _.pick(expectedObj, properties);
    return _.isEqual(newActualObj, newExpectedObj);
  }

  public static equalsArrayByProperties(
    actualObjs: object[],
    expectedObjs: object[],
    properties: string | string[]
  ): boolean {
    const newActualObjs = actualObjs.map((obj) => _.pick(obj, properties));
    const newExpectedObjs = expectedObjs.map((obj) => _.pick(obj, properties));
    return _.isEqual(newActualObjs, newExpectedObjs);
  }

  public static containsWithOmit(
    actualArray: any[],
    expected: any,
    properties: string | string[]
  ): boolean {
    const omittedExpected = _.omit(expected, properties);
    return actualArray.some((actual) => {
      const omittedActual = _.omit(actual, properties);
      return _.isEqual(omittedActual, omittedExpected);
    });
  }

  public static diff(actual: any, expected: any) {
    const diff1 = CompareUtils.difference(actual, expected);
    const diff2 = CompareUtils.difference(expected, actual);
    return { expected: diff1, actual: diff2 };
  }

  public static diffByProperties(
    actual: any,
    expected: any,
    properties: string | string[]
  ) {
    const newActualObj = _.pick(actual, properties);
    const newExpectedObj = _.pick(expected, properties);
    const diff1 = CompareUtils.difference(newActualObj, newExpectedObj);
    const diff2 = CompareUtils.difference(newExpectedObj, newActualObj);
    return { expected: diff1, actual: diff2 };
  }

  private static difference(obj1: any, obj2: any) {
    return diff(obj1, obj2);
  }
}
