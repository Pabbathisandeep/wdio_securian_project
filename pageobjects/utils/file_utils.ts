import fs from 'fs';
import path from 'path';

export class FileUtils {
    static deleteFolderRecursive(directoryPath: string) {
        if (fs.existsSync(directoryPath)) {
            fs.readdirSync(directoryPath).forEach((file, index) => {
                const curPath = path.join(directoryPath, file);
                if (fs.lstatSync(curPath).isDirectory()) {
                    FileUtils.deleteFolderRecursive(curPath);
                } else {
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(directoryPath);
        }
    }
}