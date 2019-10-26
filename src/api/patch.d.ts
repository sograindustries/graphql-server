import { DynamoDB } from "aws-sdk";
interface Patch {
    id: string;
    uuid: string;
    batteryPct?: number;
    userId?: number;
}
declare function get(uuid: string): Promise<void>;
declare function update(): Promise<void>;
declare function remove(): Promise<void>;
declare function search(userId?: string): Promise<void>;
export declare const makeService: (ddb: DynamoDB.DocumentClient) => {
    create: (patch: Patch) => Promise<void>;
    update: typeof update;
    remove: typeof remove;
    get: typeof get;
    search: typeof search;
};
export {};
