import express from "express";

declare global {
  namespace Express {
    interface Request {
      userId: any;
      id: string;
    }
  }
}
