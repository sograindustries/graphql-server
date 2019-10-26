import { Api } from "./api";

export interface Context {
  api: Api;
  auth?: {
    id: number;
    username: string;
    jwt: string;
  } | null;
}
