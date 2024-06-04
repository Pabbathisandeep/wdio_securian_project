import fs from 'fs';
import path from 'path';
import os from 'os';
import './date_extensions';
import { FileUtils } from './file_utils';

export class ScreenshotFileUtils {
  static TEMP_DIR = path.join(os.tmpdir(), 'screenshots');

  static createTempFolder() {
    if (!fs.existsSync(ScreenshotFileUtils.TEMP_DIR)) {
      fs.mkdirSync(ScreenshotFileUtils.TEMP_DIR);
    }
  }

  static deleteTempFolder() {
    FileUtils.deleteFolderRecursive(ScreenshotFileUtils.TEMP_DIR);
  }

  static getFullPath(filename: string) {
    return path.join(ScreenshotFileUtils.TEMP_DIR, filename);
  }
}
