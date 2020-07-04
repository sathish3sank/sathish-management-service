import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";

export const initializeConnection = createConnection;

export const router = express.Router;
