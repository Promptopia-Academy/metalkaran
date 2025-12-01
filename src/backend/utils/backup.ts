import { copyFile, mkdir, readdir, stat } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { logger } from "../lib/logger";

const DATA_DIR = path.join(process.cwd(), "data");
const BACKUP_DIR = path.join(process.cwd(), "data", "backups");

export interface BackupResult {
  success: boolean;
  message: string;
  backupPath?: string;
  timestamp?: string;
}

async function ensureBackupDir(): Promise<void> {
  if (!existsSync(BACKUP_DIR)) {
    await mkdir(BACKUP_DIR, { recursive: true });
    logger.info("Backup directory created", { path: BACKUP_DIR });
  }
}

async function cleanOldBackups(maxBackups: number = 10): Promise<void> {
  try {
    if (!existsSync(BACKUP_DIR)) {
      return;
    }

    const files = await readdir(BACKUP_DIR);
    const backupFiles = files
      .map((file) => ({
        name: file,
        path: path.join(BACKUP_DIR, file),
      }))
      .filter((f) => f.name.endsWith(".json.backup"));

    const filesWithStats = await Promise.all(
      backupFiles.map(async (file) => {
        const stats = await stat(file.path);
        return {
          ...file,
          mtime: stats.mtime,
        };
      })
    );

    filesWithStats.sort((a, b) => b.mtime.getTime() - a.mtime.getTime());

    if (filesWithStats.length > maxBackups) {
      const toDelete = filesWithStats.slice(maxBackups);
      for (const file of toDelete) {
        const { unlink } = await import("fs/promises");
        await unlink(file.path);
        logger.debug("Old backup deleted", { file: file.name });
      }
    }
  } catch (error) {
    logger.error("Error cleaning old backups", error as Error);
  }
}

export async function backupFile(
  fileName: string,
  createTimestamp: boolean = true
): Promise<BackupResult> {
  try {
    await ensureBackupDir();

    const sourcePath = path.join(DATA_DIR, fileName);
    if (!existsSync(sourcePath)) {
      return {
        success: false,
        message: `File ${fileName} does not exist`,
      };
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupFileName = createTimestamp
      ? `${fileName}.${timestamp}.backup`
      : `${fileName}.backup`;
    const backupPath = path.join(BACKUP_DIR, backupFileName);

    await copyFile(sourcePath, backupPath);

    logger.info("File backed up successfully", {
      file: fileName,
      backupPath,
    });

    await cleanOldBackups();

    return {
      success: true,
      message: "Backup created successfully",
      backupPath,
      timestamp,
    };
  } catch (error) {
    logger.error("Error creating backup", error as Error, { fileName });
    return {
      success: false,
      message: `Failed to create backup: ${(error as Error).message}`,
    };
  }
}

export async function backupAllFiles(): Promise<BackupResult[]> {
  const dataFiles = [
    "articles.json",
    "elements.json",
    "IContacts.json",
    "rate-limit.json",
  ];

  const results: BackupResult[] = [];

  for (const file of dataFiles) {
    const result = await backupFile(file);
    results.push(result);
  }

  return results;
}

export async function autoBackup(fileName: string): Promise<void> {
  try {
    await backupFile(fileName, true);
  } catch (error) {
    logger.warn("Auto backup failed", { fileName, error });
  }
}
