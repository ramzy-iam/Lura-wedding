import { RateLimiterMemory } from 'rate-limiter-flexible';
import { getUserIP } from './ip';

export const rateLimiter = new RateLimiterMemory({
  points: 5,
  duration: 60,
});

export const checkRateLimit = async () => {
  const ip = await getUserIP();
  return rateLimiter.consume(ip, 5);
};
