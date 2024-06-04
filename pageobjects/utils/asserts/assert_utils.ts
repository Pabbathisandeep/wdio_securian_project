import { AssertError } from './assert_error';
import { CompareUtils } from '../compare_utils';
import './../array_extensions';

export class AssertUtils {
  public static arrayLengthMoreThanZero(
    actualArray: unknown[],
    expected = true
  ): void {
    if (expected) {
      if (actualArray.length === 0) {
        throw new AssertError(`Array length equals zero`);
      }
    } else {
      AssertUtils.arrayLengthEqualsZero(actualArray, true);
    }
  }

  public static arrayLengthEqualsZero(
    actualArray: unknown[],
    expected = true
  ): void {
    if (expected) {
      if (actualArray.length > 0) {
        throw new AssertError(
          `Array length more than zero\nActual array length: ${actualArray.length}`
        );
      }
    } else {
      AssertUtils.arrayLengthMoreThanZero(actualArray, true);
    }
  }

  public static arrayLengthEquals(
    actualArray: unknown[],
    expectedLength: number,
    expected = true
  ): void {
    if (expected) {
      if (actualArray.length !== expectedLength) {
        throw new AssertError(
          `Array length does not equal ${expectedLength}. Actual length: ${actualArray.length}`
        );
      }
    } else {
      AssertUtils.arrayLengthNotEquals(actualArray, expectedLength, true);
    }
  }

  public static arrayLengthNotEquals(
    actualArray: unknown[],
    expectedLength: number,
    expected = true
  ): void {
    if (expected) {
      if (actualArray.length === expectedLength) {
        throw new AssertError(
          `Array length equals ${expectedLength}. Actual length: ${actualArray.length}`
        );
      }
    } else {
      AssertUtils.arrayLengthEquals(actualArray, expectedLength, true);
    }
  }

  // basic types
  public static arrayContains(
    actualArray: any[],
    expectedArrayValues: any[],
    expected = true
  ): void {
    if (expected) {
      const contains = actualArray.some((el) =>
        expectedArrayValues.includes(el)
      );
      if (contains === false) {
        throw new AssertError(
          `Array does not contain expected values\nActual array: ${actualArray}\nExpected values: ${expectedArrayValues}`
        );
      }
    } else {
      AssertUtils.arrayNotContains(actualArray, expectedArrayValues, true);
    }
  }

  // basic types
  public static arrayNotContains(
    actualArray: any[],
    expectedArrayValues: any[],
    expected = true
  ): void {
    if (expected) {
      const contains = actualArray.some((el) =>
        expectedArrayValues.includes(el)
      );
      if (contains) {
        throw new AssertError(
          `Array contains expected values\nActual array: ${actualArray}\nExpected values: ${expectedArrayValues}`
        );
      }
    } else {
      AssertUtils.arrayContains(actualArray, expectedArrayValues, true);
    }
  }

  // basic types
  public static arrayEquals(
    actualArray: any[],
    expectedArray: any[],
    expected = true
  ): void {
    if (expected) {
      const equals = actualArray.equalsWithOrder(expectedArray);
      if (equals === false) {
        throw new AssertError(
          `Array does not equal expected array\nActual array: ${actualArray}\nExpected array: ${expectedArray}`
        );
      }
    } else {
      AssertUtils.arrayNotEquals(actualArray, expectedArray, true);
    }
  }

  // basic types
  public static arrayNotEquals(
    actualArray: any[],
    expectedArray: any[],
    expected = true
  ): void {
    if (expected) {
      const equals = actualArray.equalsWithOrder(expectedArray);
      if (equals) {
        throw new AssertError(
          `Array equals expected array\nActual array: ${actualArray}\nExpected array: ${expectedArray}`
        );
      }
    } else {
      AssertUtils.arrayEquals(actualArray, expectedArray, true);
    }
  }

  // basic types
  public static arrayEqualsWithoutOrder(
    actualArray: any[],
    expectedArray: any[],
    expected = true
  ): void {
    if (expected) {
      const equals = actualArray.equalsWithoutOrder(expectedArray);
      if (equals === false) {
        throw new AssertError(
          `Array does not equal expected array\nActual array: ${actualArray}\nExpected array: ${expectedArray}`
        );
      }
    } else {
      AssertUtils.arrayNotEqualsWithoutOrder(actualArray, expectedArray, true);
    }
  }

  // basic types
  public static arrayNotEqualsWithoutOrder(
    actualArray: any[],
    expectedArray: any[],
    expected = true
  ): void {
    if (expected) {
      const equals = actualArray.equalsWithoutOrder(expectedArray);
      if (equals) {
        throw new AssertError(
          `Array equals expected array\nActual array: ${actualArray}\nExpected array: ${expectedArray}`
        );
      }
    } else {
      AssertUtils.arrayEqualsWithoutOrder(actualArray, expectedArray, true);
    }
  }

  // actualArray - objects; expectedArrayValues - basic types
  public static arrayEqualsByPropertyWithoutOrder(
    actualArray: any[],
    expectedArrayValues: any[],
    propertyName: string,
    expected = true
  ): void {
    if (expected) {
      const actualValues = actualArray.map((obj) => obj[propertyName]);

      const equals = actualValues.equalsWithoutOrder(expectedArrayValues);
      if (equals === false) {
        throw new AssertError(
          `Array does not equal expected array\nActual array: ${JSON.stringify(
            actualArray,
            null,
            2
          )}\nActual values: ${actualValues}\nExpected values: ${expectedArrayValues}`
        );
      }
    } else {
      AssertUtils.arrayNotEqualsByPropertyWithoutOrder(
        actualArray,
        expectedArrayValues,
        propertyName,
        true
      );
    }
  }

  // actualArray - objects; expectedArrayValues - basic types
  public static arrayNotEqualsByPropertyWithoutOrder(
    actualArray: any[],
    expectedArrayValues: any[],
    propertyName: string,
    expected = true
  ): void {
    if (expected) {
      const actualValues = actualArray.map((obj) => obj[propertyName]);

      const equals = actualValues.equalsWithoutOrder(expectedArrayValues);
      if (equals) {
        throw new AssertError(
          `Array equal expected array\nActual array: ${JSON.stringify(
            actualArray,
            null,
            2
          )}\nActual values: ${actualValues}\nExpected values: ${expectedArrayValues}`
        );
      }
    } else {
      AssertUtils.arrayEqualsByPropertyWithoutOrder(
        actualArray,
        expectedArrayValues,
        propertyName,
        true
      );
    }
  }

  // actualArray - objects; expectedArrayValues - basic types
  public static arrayContainsByProperty(
    actualArray: any[],
    expectedArrayValues: any[],
    propertyName: string,
    expected = true
  ): void {
    if (expected) {
      const actualValues = actualArray.map((obj) => obj[propertyName]);
      const contains = actualValues.some((el) =>
        expectedArrayValues.includes(el)
      );

      if (contains === false) {
        throw new AssertError(
          `Array does not contain expected values\nActual array: ${JSON.stringify(
            actualArray,
            null,
            2
          )}\nActual values: ${actualValues}\nExpected values: ${expectedArrayValues}`
        );
      }
    } else {
      AssertUtils.arrayNotContainsByProperty(
        actualArray,
        expectedArrayValues,
        propertyName,
        true
      );
    }
  }

  // actualArray - objects; expectedArrayValues - basic types
  public static arrayNotContainsByProperty(
    actualArray: any[],
    expectedArrayValues: any[],
    propertyName: string,
    expected = true
  ): void {
    if (expected) {
      const actualValues = actualArray.map((obj) => obj[propertyName]);
      const contains = actualValues.some((el) =>
        expectedArrayValues.includes(el)
      );

      if (contains) {
        throw new AssertError(
          `Array contains expected values\nActual array: ${JSON.stringify(
            actualArray,
            null,
            2
          )}\nActual values: ${actualValues}\nExpected values: ${expectedArrayValues}`
        );
      }
    } else {
      AssertUtils.arrayContainsByProperty(
        actualArray,
        expectedArrayValues,
        propertyName,
        true
      );
    }
  }

  // object or object[]
  public static objectEquals(
    actualObj: any,
    expectedObj: any,
    expected = true
  ): void {
    if (expected) {
      const equals = CompareUtils.equals(actualObj, expectedObj);

      if (equals === false) {
        const diffs = CompareUtils.diff(actualObj, expectedObj);
        throw new AssertError(
          `Objects are not equal\nActual object: ${JSON.stringify(
            actualObj,
            null,
            2
          )}\nExpected object: ${JSON.stringify(
            expectedObj,
            null,
            2
          )}\nDiffs: ${JSON.stringify(diffs, null, 2)}`
        );
      }
    } else {
      AssertUtils.objectNotEquals(actualObj, expectedObj, true);
    }
  }

  // object or object[]
  public static objectNotEquals(
    actualObj: any,
    expectedObj: any,
    expected = true
  ): void {
    if (expected) {
      const equals = CompareUtils.equals(actualObj, expectedObj);

      if (equals) {
        throw new AssertError(
          `Objects are equal\nActual object: ${JSON.stringify(
            actualObj,
            null,
            2
          )}\nExpected object: ${JSON.stringify(expectedObj, null, 2)}.`
        );
      }
    } else {
      AssertUtils.objectEquals(actualObj, expectedObj, true);
    }
  }

  public static objectEqualsByProperties(
    actualObj: object,
    expectedObj: object,
    properties: string | string[],
    expected = true
  ): void {
    if (expected) {
      const equals = CompareUtils.equalsByProperties(
        actualObj,
        expectedObj,
        properties
      );

      if (equals === false) {
        const diffs = CompareUtils.diffByProperties(
          actualObj,
          expectedObj,
          properties
        );
        throw new AssertError(
          `Objects are not equal\nActual object: ${JSON.stringify(
            actualObj,
            null,
            2
          )}\nExpected object: ${JSON.stringify(
            expectedObj,
            null,
            2
          )}\nDiffs: ${JSON.stringify(diffs, null, 2)}`
        );
      }
    } else {
      AssertUtils.objectNotEqualsByProperties(
        actualObj,
        expectedObj,
        properties,
        true
      );
    }
  }

  public static objectNotEqualsByProperties(
    actualObj: object,
    expectedObj: object,
    properties: string | string[],
    expected = true
  ): void {
    if (expected) {
      const equals = CompareUtils.equalsByProperties(
        actualObj,
        expectedObj,
        properties
      );

      if (equals) {
        throw new AssertError(
          `Objects are equal\nActual object: ${JSON.stringify(
            actualObj,
            null,
            2
          )}\nExpected object: ${JSON.stringify(expectedObj, null, 2)}.`
        );
      }
    } else {
      AssertUtils.objectNotEqualsByProperties(
        actualObj,
        expectedObj,
        properties,
        true
      );
    }
  }

  // actualArray - object[]; expectedObj - object
  public static objectArrayContains(
    actualArray: object[],
    expectedObj: object,
    expected = true
  ): void {
    if (expected) {
      const contains = CompareUtils.contains(actualArray, expectedObj);

      if (contains === false) {
        throw new AssertError(
          `Array does not contain expected object\nActual array: ${JSON.stringify(
            actualArray,
            null,
            2
          )}\nExpected object: ${JSON.stringify(expectedObj, null, 2)}.`
        );
      }
    } else {
      AssertUtils.objectArrayNotContains(actualArray, expectedObj, true);
    }
  }

  // actualArray - object[]; expectedObj - object
  public static objectArrayNotContains(
    actualArray: object[],
    expectedObj: object,
    expected = true
  ): void {
    if (expected) {
      const contains = CompareUtils.contains(actualArray, expectedObj);

      if (contains) {
        throw new AssertError(
          `Array contains expected object\nActual array: ${JSON.stringify(
            actualArray,
            null,
            2
          )}\nExpected object: ${JSON.stringify(expectedObj, null, 2)}.`
        );
      }
    } else {
      AssertUtils.objectArrayContains(actualArray, expectedObj, true);
    }
  }

  // actualArray - object[]; expectedObj - object
  public static objectArrayContainsWithOmit(
    actualArray: object[],
    expectedObj: object,
    paths: string | string[],
    expected = true
  ): void {
    if (expected) {
      const contains = CompareUtils.containsWithOmit(
        actualArray,
        expectedObj,
        paths
      );

      if (contains === false) {
        throw new AssertError(
          `Array does not contain expected object\nActual array: ${JSON.stringify(
            actualArray,
            null,
            2
          )}\nExpected object: ${JSON.stringify(expectedObj, null, 2)}.`
        );
      }
    } else {
      AssertUtils.objectArrayNotContainsWithOmit(
        actualArray,
        expectedObj,
        paths,
        true
      );
    }
  }

  // actualArray - object[]; expectedObj - object
  public static objectArrayNotContainsWithOmit(
    actualArray: object[],
    expectedObj: object,
    paths: string | string[],
    expected = true
  ): void {
    if (expected) {
      const contains = CompareUtils.containsWithOmit(
        actualArray,
        expectedObj,
        paths
      );

      if (contains) {
        throw new AssertError(
          `Array contains expected object\nActual array: ${JSON.stringify(
            actualArray,
            null,
            2
          )}\nExpected object: ${JSON.stringify(expectedObj, null, 2)}.`
        );
      }
    } else {
      AssertUtils.objectArrayContainsWithOmit(
        actualArray,
        expectedObj,
        paths,
        true
      );
    }
  }

  // actualArray - object[]; expectedArray - object[]
  public static objectArrayEquals(
    actualArray: object[],
    expectedArray: object[],
    expected = true
  ): void {
    if (expected) {
      const equals = CompareUtils.equals(actualArray, expectedArray);

      if (equals === false) {
        throw new AssertError(
          `Array does not equal expected array\nActual array: ${JSON.stringify(
            actualArray,
            null,
            2
          )}\nExpected array: ${JSON.stringify(expectedArray, null, 2)}.`
        );
      }
    } else {
      AssertUtils.objectArrayNotEquals(actualArray, expectedArray, true);
    }
  }

  // actualArray - object[]; expectedArray - object[]
  public static objectArrayNotEquals(
    actualArray: object[],
    expectedArray: object[],
    expected = true
  ): void {
    if (expected) {
      const equals = CompareUtils.equals(actualArray, expectedArray);

      if (equals) {
        throw new AssertError(
          `Array equals expected array\nActual array: ${JSON.stringify(
            actualArray,
            null,
            2
          )}\nExpected array: ${JSON.stringify(expectedArray, null, 2)}.`
        );
      }
    } else {
      AssertUtils.objectArrayEquals(actualArray, expectedArray, true);
    }
  }

  // actualArray - object[]; expectedArray - object[]
  public static objectArrayEqualsByProperties(
    actualArray: object[],
    expectedArray: object[],
    properties: string | string[],
    expected = true
  ): void {
    if (expected) {
      const equals = CompareUtils.equalsArrayByProperties(
        actualArray,
        expectedArray,
        properties
      );

      if (equals === false) {
        throw new AssertError(
          `Array does not equal expected array\nActual array: ${JSON.stringify(
            actualArray,
            null,
            2
          )}\nExpected array: ${JSON.stringify(expectedArray, null, 2)}.`
        );
      }
    } else {
      AssertUtils.objectArrayNotEqualsByProperties(
        actualArray,
        expectedArray,
        properties,
        true
      );
    }
  }

  // actualArray - object[]; expectedArray - object[]
  public static objectArrayNotEqualsByProperties(
    actualArray: object[],
    expectedArray: object[],
    properties: string | string[],
    expected = true
  ): void {
    if (expected) {
      const equals = CompareUtils.equalsArrayByProperties(
        actualArray,
        expectedArray,
        properties
      );

      if (equals) {
        throw new AssertError(
          `Array equals expected array\nActual array: ${JSON.stringify(
            actualArray,
            null,
            2
          )}\nExpected array: ${JSON.stringify(expectedArray, null, 2)}.`
        );
      }
    } else {
      AssertUtils.objectArrayEqualsByProperties(
        actualArray,
        expectedArray,
        properties,
        true
      );
    }
  }

  public static allValuesInArrayEqual(
    actualArray: any[],
    expectedValue: any,
    expected = true
  ): void {
    if (expected) {
      const equals = CompareUtils.allValuesInArrayEqual(
        actualArray,
        expectedValue
      );

      if (equals === false) {
        throw new AssertError(
          `Not all values in array equal expected value\nActual array: ${JSON.stringify(
            actualArray,
            null,
            2
          )}\nExpected value: ${expectedValue}.`
        );
      }
    } else {
      AssertUtils.allValuesInArrayNotEqual(actualArray, expectedValue, true);
    }
  }

  public static allValuesInArrayNotEqual(
    actualArray: any[],
    expectedValue: any,
    expected = true
  ): void {
    if (expected) {
      const equals = CompareUtils.allValuesInArrayEqual(
        actualArray,
        expectedValue
      );

      if (equals) {
        throw new AssertError(
          `All values in array equal expected value\nActual array: ${JSON.stringify(
            actualArray,
            null,
            2
          )}\nExpected value: ${expectedValue}.`
        );
      }
    } else {
      AssertUtils.allValuesInArrayEqual(actualArray, expectedValue, true);
    }
  }

  public static allValuesInArrayAreUnique(
    actualArray: any[],
    expected = true
  ): void {
    if (expected) {
      const equals = CompareUtils.allValuesInArrayAreUnique(actualArray);

      if (equals === false) {
        throw new AssertError(
          `Not all values in array are unique\nActual array: ${JSON.stringify(
            actualArray,
            null,
            2
          )}`
        );
      }
    } else {
      AssertUtils.allValuesInArrayAreNotUnique(actualArray, true);
    }
  }

  public static allValuesInArrayAreNotUnique(
    actualArray: any[],
    expected = true
  ): void {
    if (expected) {
      const equals = CompareUtils.allValuesInArrayAreUnique(actualArray);

      if (equals) {
        throw new AssertError(
          `All values in array are unique\nActual array: ${JSON.stringify(
            actualArray,
            null,
            2
          )}`
        );
      }
    } else {
      AssertUtils.allValuesInArrayAreUnique(actualArray, true);
    }
  }
}
