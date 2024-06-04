export class UrlUtils {
  public static getHostname = async (url: string) => {
    const urlObj = new URL(url);
    return urlObj.hostname;
  };
}
