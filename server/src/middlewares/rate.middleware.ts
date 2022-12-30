import { Request, Response, NextFunction } from "express";
import rateLimit from "express-rate-limit";
import moment from "moment";
import * as redis from "redis";

export const rateLimiterMiddleware = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after 60 seconds!",
  standardHeaders: true,
  legacyHeaders: false,
});

// ///////////////////////////////////////////////////////

const redisClient = redis.createClient();
redisClient.on("error", (err) => console.log("Redis Client Error", err));

const WINDOW_SIZE = 24;
const MAX_WINDOW_REQUEST_COUNT = 100;
const WINDOW_LOG_INTERVAL = 1;

type IRequestLog = {
  requestTimeStamp: number;
  requestCount: number;
};

export const customRateLimiterMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await redisClient.connect();
  try {
    if (!redisClient) {
      throw new Error("Redis client does not exist!");
      process.exit(1);
    }

    const record: string | null = await redisClient.get(req.ip);
    const currentRequestTime = moment();
    console.log(record);

    if (record == null) {
      let newRecord: Array<IRequestLog> = [];
      let requestLog: IRequestLog = {
        requestTimeStamp: currentRequestTime.unix(),
        requestCount: 1,
      };
      newRecord.push(requestLog);
      await redisClient.set(req.ip, JSON.stringify(newRecord));
      next();
    }

    let data = record ? JSON.parse(record) : [];
    let windowStartTimestamp = moment().subtract(WINDOW_SIZE, "hours").unix();
    let requestsWithinWindow = data.filter((entry: any) => {
      return entry.requestTimeStamp > windowStartTimestamp;
    });
    console.log("requestsWithinWindow", requestsWithinWindow);
    let totalWindowRequestsCount = requestsWithinWindow.reduce(
      (accumulator: number, entry: any) => {
        return accumulator + entry.requestCount;
      },
      0
    );

    if (totalWindowRequestsCount >= MAX_WINDOW_REQUEST_COUNT) {
      res
        .status(429)
        .send.bind(
          `You have exceeded the ${MAX_WINDOW_REQUEST_COUNT} requests in ${WINDOW_SIZE} hrs limit!`
        );
    } else {
      let lastRequestLog = data[data.length - 1];
      let potentialCurrentWindowIntervalStartTimeStamp = currentRequestTime
        .subtract(WINDOW_LOG_INTERVAL, "hours")
        .unix();

      if (
        lastRequestLog.requestTimeStamp >
        potentialCurrentWindowIntervalStartTimeStamp
      ) {
        lastRequestLog.requestCount++;
        data[data.length - 1] = lastRequestLog;
      } else {
        data.push({
          requestTimeStamp: currentRequestTime.unix(),
          requestCount: 1,
        });
      }
      await redisClient.set(req.ip, JSON.stringify(data));
      next();
    }
  } catch (error) {
    next(error);
  }
};
