export class ConvertUtil {
  public static async convertSuccessOrErrorToBoolean(text: string) {
    if (text === 'success') {
      return false;
    } else if (text === 'error') {
      return true;
    } else {
      throw new Error(
        `${text} is not valid response type it should be either success or error`
      );
    }
  }
}
