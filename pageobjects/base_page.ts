import { Timeout } from '../pageobjects/utils/timeouts.ts';

export class BasePage {
  protected formLocator = '//body';
  protected appPageLoadingLocator = '//app-page-loading';

  constructor(formLocator?: string) {
    if (formLocator !== undefined) {
      this.formLocator = formLocator;
    }
  }

  public getPageLocator() {
    return this.formLocator;
  }

  public async assertIsVisible() {
    await browser.waitUntil(
      async function () {
        const state = await browser.execute(function () {
          return document.readyState;
        });
        return state === 'complete';
      },
      {
        timeout: Timeout.DEFAULT_TIMEOUT,
        timeoutMsg: 'Page is not loaded',
      }
    );

    await $(this.appPageLoadingLocator).waitForDisplayed({ reverse: true });

    const form = await $(this.formLocator);
    await form.waitForExist({ timeout: 60000 });
    await browser.pause(500);
  }
}
