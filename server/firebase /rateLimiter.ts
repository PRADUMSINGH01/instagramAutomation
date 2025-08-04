import LRU from "lru-cache";

// Configure cache
const rateLimitCache = new LRU({
  max: 1000,
  ttl: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "3600000", 10),
});

export const rateLimit = (ip: string) => {
  const now = Date.now();
  const entry = rateLimitCache.get(ip) || { count: 0, startTime: now };

  // Reset if window has passed
  if (
    now - entry.startTime >
    parseInt(process.env.RATE_LIMIT_WINDOW_MS || "3600000", 10)
  ) {
    entry.count = 0;
    entry.startTime = now;
  }

  // Increment count
  entry.count++;
  rateLimitCache.set(ip, entry);

  const maxRequests = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "5", 10);

  return {
    exceeded: entry.count > maxRequests,
    remaining: Math.max(maxRequests - entry.count, 0),
    resetTime:
      entry.startTime +
      parseInt(process.env.RATE_LIMIT_WINDOW_MS || "3600000", 10),
  };
};
