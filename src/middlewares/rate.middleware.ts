import rateLimit from "express-rate-limit";

export const rateLimiterMiddleware = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after 60 seconds!",
  standardHeaders: true,
  legacyHeaders: false,
});
