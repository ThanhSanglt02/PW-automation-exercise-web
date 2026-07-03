type LogDetails = Record<string, unknown>;

const DEFAULT_LOG_LABEL = 'DEBUG';

/**
 * Prints test execution details to the terminal.
 *
 * @param message Log message.
 * @param details Optional log details.
 * @param label Log label.
 */
export function logger(message: string, details?: LogDetails, label: string = DEFAULT_LOG_LABEL): void {
    const logDetails = details ? ` ${JSON.stringify(details)}` : '';

    console.log(`[${new Date().toISOString()}] ${label}: ${message}${logDetails}`);
}
