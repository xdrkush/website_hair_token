class RateLimiter {
  private requests: number[] = [];
  private maxRequests: number;
  private windowMs: number;

  constructor(maxRequests: number = 10, windowMs: number = 10000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  private cleanup() {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.windowMs);
  }

  canMakeRequest(): boolean {
    this.cleanup();
    return this.requests.length < this.maxRequests;
  }

  recordRequest(): void {
    this.requests.push(Date.now());
  }

  async waitForSlot(): Promise<void> {
    while (!this.canMakeRequest()) {
      const oldestRequest = Math.min(...this.requests);
      const waitTime = this.windowMs - (Date.now() - oldestRequest);
      if (waitTime > 0) {
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
      this.cleanup();
    }
  }

  getRemainingRequests(): number {
    this.cleanup();
    return Math.max(0, this.maxRequests - this.requests.length);
  }

  getTimeUntilReset(): number {
    if (this.requests.length === 0) return 0;
    const oldestRequest = Math.min(...this.requests);
    return Math.max(0, this.windowMs - (Date.now() - oldestRequest));
  }
}

// Instance globale pour toutes les requêtes
const globalRateLimiter = new RateLimiter(10, 10000);

// Fonction fetch avec rate limiting
export async function rateLimitedFetch(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  await globalRateLimiter.waitForSlot();
  globalRateLimiter.recordRequest();
  
  return fetch(input, init);
}

// Fonction pour obtenir les statistiques du rate limiter
export function getRateLimitStats() {
  return {
    remaining: globalRateLimiter.getRemainingRequests(),
    timeUntilReset: globalRateLimiter.getTimeUntilReset(),
  };
}

export default globalRateLimiter; 