export class RequestUtils {
  public static async getRequestUrlFileSize(url: string) {
    const requests = await browser.getRequests();
    const exportRequest = requests.find((request) => request.url.includes(url));
    const fileSize = parseInt(exportRequest.response.headers['content-length']);
    return fileSize;
  }
}
