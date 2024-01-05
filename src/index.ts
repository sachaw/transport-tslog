import { HyperDXLogger } from "@hyperdx/node-logger";
import { ILogObjMeta } from "tslog";

// TODO: Replace when LoggerOptions is exported
export type LoggerOptions = {
  apiKey: string;
  baseUrl?: string;
  bufferSize?: number;
  sendIntervalMs?: number;
  service?: string;
  timeout?: number;
};

export class HyperDxtslog {
  private readonly logger: HyperDXLogger;

  public registerTransport: (logObj: ILogObjMeta) => void;

  constructor(options: LoggerOptions) {
    this.logger = new HyperDXLogger(options);

    // Arrow function to maintain the context of 'this'
    this.registerTransport = (logObj: ILogObjMeta) => {
      let message = "";
      const additionalData: string[] = [];
      for (const index in logObj) {
        if (!Number.isNaN(parseInt(index))) {
          if (index === "0") {
            message = logObj[index] as unknown as string; //tslog's type definition is wrong
          } else {
            additionalData.push(logObj[index] as unknown as string);
          }
        }
      }
      const meta = {
        ...logObj._meta,
        additionalData,
      };
      this.logger.postMessage(meta.logLevelName, message, meta);
    };
  }
}
