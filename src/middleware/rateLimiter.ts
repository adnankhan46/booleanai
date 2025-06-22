// src/middleware/rateLimiter.ts
import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";

// IP-based rate limiter
export const ipLimiter: RateLimitRequestHandler = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 3, // limit each IP to 3 requests per windowMs
  message: {
    message:
      "Too many requests in a minute, You can make a maximum of 3 requests per minute",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Global rate limiter
export class GlobalRateLimiter {
  private static requestCount: number = 0;
  private static readonly REQUEST_LIMIT: number = 15;
  private static readonly LIMIT_WINDOW_MS: number = 60 * 1000;

  constructor() {
    // Reset request count periodically
    setInterval(() => {
      GlobalRateLimiter.requestCount = 0;
    }, GlobalRateLimiter.LIMIT_WINDOW_MS);
  }

  /**
   * Check if the global rate limit has been reached
   * @returns boolean indicating if limit is reached
   */
  public isLimitReached(): boolean {
    return GlobalRateLimiter.requestCount >= GlobalRateLimiter.REQUEST_LIMIT;
  }

  /**
   * Increment the request counter
   */
  public incrementCount(): void {
    GlobalRateLimiter.requestCount++;
  }
}
