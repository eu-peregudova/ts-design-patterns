import pino from "pino";
import { join, resolve } from "node:path";
import * as fs from "node:fs";

const logDirectory = join(resolve(`${__dirname}/../../`), 'logs');
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}
const logFile = `${logDirectory}/app.log`;

const pinoLogger = pino({
  name: "pino-logger",
  level: "info",
  transport: {
    targets: [
      {
        target: "pino/file",
        options: { destination: logFile }
      },
      {
        target: "pino-pretty",
        options: { colorize: true }
      }
    ]
  }
});

export default pinoLogger;
