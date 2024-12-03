export const retry = async <T>(
  fn: () => Promise<T>,
  maxRetries: number,
  delay: number,
  shouldRetry?: (error: unknown) => boolean,
): Promise<T> => {
  let retries = 0;

  while (true) {
    try {
      return await fn();
    } catch (error) {
      if (retries >= maxRetries || (shouldRetry && !shouldRetry(error))) {
        throw error;
      }
      await new Promise(resolve => setTimeout(resolve, delay));
      retries++;
    }
  }
};
