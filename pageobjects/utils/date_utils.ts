export class DateUtils {
  public static now() {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }

  public static nowMonth() {
    const now = DateUtils.now();
    now.setDate(1);
    return now;
  }
}
