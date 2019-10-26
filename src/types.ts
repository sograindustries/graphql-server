type Role = "patient" | "doctor" | "admin";

interface User {
  id: string;
  username: string;
  email: string;
  roles: Role[];
}

interface Patch {
  id: string; // same as uuid.
  uuid: string;
  batteryPct: number;
}

type Voltage = number;

interface Datum {
  timestampEpoch: number;
  voltage: Voltage;
}

type Payload = Datum[];
