import { parse } from 'date-fns';

declare global {
  interface String {
    format(...replacements: any[]): string;
    formatLocator(textEquals?: string): string;
    toDate(format: string): Date;
    lines(): string[];
    toPercent(): number;
  }
}

String.prototype.format = function () {
  let args = arguments;
  return this.replace(/{(\d+)}/g, function (match, number) {
    return typeof args[number] != 'undefined' ? args[number].toString() : match;
  });
};

String.prototype.formatLocator = function (textEquals?: string) {
  let formattedLocator = this;

  if (textEquals !== undefined) {
    formattedLocator = formattedLocator.replace(
      /{text_equals}/g,
      '(normalize-space(.)="{0}" or normalize-space(.)="{1}" or normalize-space(text())="{0}" or normalize-space(text())="{1}")'.format(
        textEquals,
        textEquals.replace(/ +/g, ' ')
      )
    );
    formattedLocator = formattedLocator.replace(
      /{text_contains}/g,
      '(contains(normalize-space(.),"{0}") or contains(normalize-space(.),"{1}") or contains(normalize-space(text()),"{0}") or contains(normalize-space(text()),"{1}"))'.format(
        textEquals,
        textEquals.replace(/ +/g, ' ')
      )
    );
  }

  return formattedLocator.toString();
};

// https://date-fns.org/v2.0.0-alpha.6/docs/parse
String.prototype.toDate = function toDate(format: string): Date {
  const date = parse(this.toString(), format, new Date());
  return date;
};

String.prototype.lines = function lines(): string[] {
  return this.split(/\r\n|\r|\n/);
};

String.prototype.toPercent = function toPercent(): number {
  const text = this.slice(0, -1);
  let num = parseInt(text);
  num = num / 100;
  return num;
};
