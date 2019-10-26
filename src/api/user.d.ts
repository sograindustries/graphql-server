import { DynamoDB } from "aws-sdk";
interface User {
    id: string;
    username: string;
    email?: string;
}
declare function update(): Promise<void>;
declare function remove(): Promise<void>;
declare function search(userId?: string): Promise<void>;
export declare const makeService: (ddb: DynamoDB.DocumentClient) => {
    create: (user: User) => Promise<unknown>;
    update: typeof update;
    remove: typeof remove;
    get: (id: string) => Promise<User | null>;
    search: typeof search;
};
export {};
