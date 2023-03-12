import { existsSync, mkdirSync } from "fs";

export const createFolderIfNotExists = (folderPath: string) => {
  if (!existsSync(folderPath)) {
    mkdirSync(folderPath);
    return folderPath;
  } else {
    console.log(`Folder ${folderPath} already exists`);
    return folderPath;
  }
}

export default createFolderIfNotExists;
