import { Timeout } from './timeouts';

export class WaitForUtils {
  public static waitForAsyncEquals = async (
    conditionFunc: (...args: any[]) => Promise<any>,
    conditionResult: any,
    timeout: number = Timeout.DEFAULT_TIMEOUT,
    ...args: any[]
  ) => {
    await browser.waitUntil(
      async () => (await conditionFunc(args)) === conditionResult,
      {
        timeout: timeout,
        timeoutMsg: `Function result is not equal condition result after ${timeout} ms. Function result = ${await conditionFunc(
          args
        )}; condition result = ${conditionResult}`,
      }
    );
  };
}

export const waitForRequest = async (
  browser: WebdriverIO.Browser,
  match: string,
  maxTimeout: number
) =>
  new Promise((resolve) => {
    let timeout = 0;
    const step = 100;
    const interval = setInterval(async () => {
      if (timeout <= maxTimeout) {
        const requests = await browser.getRequests({ includePending: true });
        const hasRequest = requests.find((request) =>
          request.url.includes(match)
        );
        if (hasRequest) {
          clearInterval(interval);
          resolve(true);
        } else {
          timeout += step;
        }
      } else {
        resolve(false);
        clearInterval(interval);
      }
    }, step);
  });

export const waitForPendingRequests = async (
  browser: WebdriverIO.Browser,
  maxTimeout: number
) =>
{
  browser.disableInterceptor();
  browser.setupInterceptor();
  return new Promise((resolve) => {
    let timeout = 0;
    const step = 100;
    const interval = setInterval(async () => {
      if (timeout <= maxTimeout) {
        const hasRequests = await browser.hasPendingRequests();
        if (hasRequests) {
          timeout += step;
        } else {
          clearInterval(interval);
          resolve(true);
        }
      } else {
        resolve(false);
        clearInterval(interval);
      }
    }, step);
  });}
