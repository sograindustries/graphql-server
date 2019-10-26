import { Api } from "./api";

export interface Context {
  api: Api;
  auth?: {
    username: string;
    jwt: string;
  } | null;
}
