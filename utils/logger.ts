import fs from 'fs';
import path from 'path';
import winston from 'winston';

// Create logs directory if it doesn't exist
const logDir = path.resolve(process.cwd(), 'logs');
fs.existsSync(logDir) || fs.mkdirSync(logDir, { recursive: true });

// Define reusable file transport and logger
let fileTransport: winston.transport | null = null;

const loggerInstance = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    winston.format.printf(({ level, message, timestamp }) =>
      `[${timestamp}] ${level.toUpperCase()}: ${message}`
    )
  ),
  transports: [
    new winston.transports.Console(), // Only console initially
  ],
});

// Create file transport dynamically
const createFileTransport = () => {
  if (!fileTransport) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const logFilePath = path.join(logDir, `test-${timestamp}.log`);

    fileTransport = new winston.transports.File({ filename: logFilePath });
    loggerInstance.add(fileTransport);
  }
};

// ES2025-ready logger interface
export const logger = {
  info(msg: string) {
    createFileTransport();
    loggerInstance.info(msg);
  },
  error(msg: string) {
    createFileTransport();
    loggerInstance.error(msg);
  },
  warn(msg: string) {
    createFileTransport();
    loggerInstance.warn(msg);
  },
  debug(msg: string) {
    createFileTransport();
    loggerInstance.debug(msg);
  },
};
