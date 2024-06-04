import { Timeout } from './timeouts';
import fs from 'fs';
import path from 'path';
import os from 'os';
import './date_extensions';
import { FileUtils } from './file_utils';

export class DownloadFileUtils {
  static TEMP_DIR = path.join(os.tmpdir(), 'download');

  static async isDownloaded(
    filename: string,
    timeout?: number
  ): Promise<boolean> {
    if (timeout === undefined) {
      timeout = Timeout.DEFAULT_DOWNLOAD_TIMEOUT;
    }

    let targetFilepath = DownloadFileUtils.getFullPath(filename);

    const exists = await DownloadFileUtils.waitSync(
      DownloadFileUtils.existsByRegExp,
      timeout,
      targetFilepath
    );
    if (exists) {
      const targetFilename =
        DownloadFileUtils.getFullFilenameByRegExp(targetFilepath);

      if (targetFilename === undefined) return false;
      targetFilepath = DownloadFileUtils.getFullPath(targetFilename);

      const canRead = await DownloadFileUtils.waitAsync(
        DownloadFileUtils.canRead,
        timeout,
        targetFilepath
      );
      if (canRead) {
        return true;
      }
    }

    return false;
  }

  static async fileSizeEquals(
    filename: string,
    fileSize: number,
    timeout?: number
  ): Promise<boolean> {
    if (timeout === undefined) {
      timeout = Timeout.DEFAULT_DOWNLOAD_TIMEOUT;
    }

    let targetFilepath = DownloadFileUtils.getFullPath(filename);

    const exists = await DownloadFileUtils.waitSync(
      DownloadFileUtils.existsByRegExp,
      timeout,
      targetFilepath
    );
    if (exists) {
      const targetFilename =
        DownloadFileUtils.getFullFilenameByRegExp(targetFilepath);

      if (targetFilename === undefined) return false;
      targetFilepath = DownloadFileUtils.getFullPath(targetFilename);

      const equals = await DownloadFileUtils.waitSync(
        DownloadFileUtils.compareFileSize,
        timeout,
        targetFilepath,
        fileSize
      );
      if (equals) {
        return true;
      }
    }

    return false;
  }

  static createTempFolder() {
    if (!fs.existsSync(DownloadFileUtils.TEMP_DIR)) {
      fs.mkdirSync(DownloadFileUtils.TEMP_DIR);
    }
  }

  static deleteTempFolder() {
    FileUtils.deleteFolderRecursive(DownloadFileUtils.TEMP_DIR);
  }

  static getFullPath(filename: string) {
    return path.join(DownloadFileUtils.TEMP_DIR, filename);
  }

  private static compareFileSize(filepath: string, fileSize: number): boolean {
    const stats = fs.statSync(filepath);
    const fileSizeInBytes = stats.size;
    return fileSizeInBytes === fileSize;
  }

  private static exists(filepath: string): boolean {
    return fs.existsSync(filepath);
  }

  private static existsByRegExp(filepath: string): boolean {
    const dirname = path.dirname(filepath);
    const expectedFilename = filepath.replace(dirname + '/', '');
    const filenames = fs.readdirSync(dirname);

    for (const filename of filenames) {
      const regex = new RegExp(expectedFilename);
      if (regex.test(filename)) return true;
    }

    return false;
  }

  public static getFullFilenameByRegExp(filepath: string): string | undefined {
    const dirname = path.dirname(filepath);
    const expectedFilename = filepath.replace(dirname + '/', '');
    const filenames = fs.readdirSync(dirname);

    for (const filename of filenames) {
      const regex = new RegExp(expectedFilename);
      if (regex.test(filename)) return filename;
    }

    return undefined;
  }

  private static async canRead(filepath: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      fs.access(filepath, fs.constants.R_OK, function (err) {
        if (!err) {
          resolve(true);
        } else {
          reject(false);
        }
      });
    });
  }

  private static async isNotLocked(filepath: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      fs.open(filepath, 'r+', function (err, fd) {
        if (err && err.code !== 'EBUSY') {
          resolve(true);
        } else {
          reject(false);
        }
      });
    });
  }

  private static async waitSync(
    check: (...args: any[]) => boolean,
    timeout: number,
    ...args: any[]
  ): Promise<boolean> {
    try {
      await browser.waitUntil(async () => check(...args) === true, {
        timeout: timeout,
      });
      return true;
    } catch (err) {
      return false;
    }
  }

  private static async waitAsync(
    check: (...args: any[]) => Promise<boolean>,
    timeout: number,
    ...args: any[]
  ): Promise<boolean> {
    try {
      await browser.waitUntil(async () => (await check(...args)) === true, {
        timeout: timeout,
      });
      return true;
    } catch (err) {
      return false;
    }
  }
}
