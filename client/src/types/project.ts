import { Client } from "./client";
import { ProjectStatus } from "../constants/projectManagementConstants";

export type Project = {
  id: string;
  name: string;
  status: String;
  description: string;
  client: Client;
};
