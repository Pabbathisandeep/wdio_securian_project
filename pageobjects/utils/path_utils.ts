import path from 'path';

export class PathUtils {
  public static getDataDirectoryPath(): string {
    return path.join(__dirname, '../../test/data');
  }

  public static getFileInDataDirectoryPath(filename: string): string {
    return path.join(PathUtils.getDataDirectoryPath(), filename);
  }
}
