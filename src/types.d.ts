declare type Role = "patient" | "doctor" | "admin";
interface User {
    id: string;
    username: string;
    email: string;
    roles: Role[];
}
interface Patch {
    id: string;
    uuid: string;
    batteryPct: number;
}
declare type Voltage = number;
interface Datum {
    timestampEpoch: number;
    voltage: Voltage;
}
declare type Payload = Datum[];
