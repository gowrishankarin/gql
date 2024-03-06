import express from "express";
import { User } from "../datasources/user.api";

export interface AuthorizedRequest extends express.Request {
  auth: typeof User;
}
