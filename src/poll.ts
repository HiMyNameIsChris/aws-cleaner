import logger from "./logger.js";

export type AsyncPredicate = (durationMs: number) => Promise<boolean>;

export interface PollerOptions {
  description?: string;
}

export type Poller = (predicate: AsyncPredicate, options?: PollerOptions) => Promise<void>;

export interface PollerFactoryOptions {
  intervalMs: number;
  timeoutMs?: number | null;
}

const defaultOptions: PollerFactoryOptions = {
  intervalMs: 5 * 1000,
  timeoutMs: 10 * 60 * 1000,
};

xport function getPoller(options?: PollerFactoryOptions): Poller {
  const { intervalMs, timeoutMs } = { ...defaultOptions, ...options };
  const timeoutError = new Error('Timeout exceeded');

  return async function poll(predicate: AsyncPredicate, options?: PollerOptions): Promise<void> {
    const description = options?.description;
    const startTime = Date.now();
    let durationMs = 0;

    while (true) {
      try {
        const result = await predicate(durationMs);
        if (result) {
          return;
        }
        if (timeoutMs != null && durationMs > timeoutMs) {
          throw timeoutError;
        }
        if (description) {
          logger.debug(`Waiting ${formatDuration(durationMs)} for ${description}`);
        }
        durationMs = Date.now() - startTime;
        await new Promise(resolve => setTimeout(resolve, intervalMs));
      } catch (err) {
        throw err;
      }
    }
  };
}

function formatDuration(ms: number): string {
  let seconds = Math.round(ms / 1000);
  if (seconds >= 60) {
    let minutes = Math.floor(seconds / 60);
    seconds %= 60;
    if (minutes >= 60) {
      let hours = Math.floor(minutes / 60);
      minutes %= 60;
      return `${hours}h${minutes}m${seconds}s`;
    }
    return `${minutes}m${seconds}s`;
  }
  return `${seconds}s`;
}
