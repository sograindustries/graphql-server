import gql from "graphql-tag";

export default gql`
  type Patch {
    id: Int!
    bleId: String
  }

  type Battery {
    value: Float
    createdAt: String
  }

  type Reading {
    id: Int!
    createdAt: String
    uri: String
    firmwareVersion: String
    sequence: Int
    uptimeMs: Int
    tags: [String!]
  }

  extend type Patch {
    battery: Battery
    batteryActivity: [Battery!]
    firmwareVersion: String
    appVersion: String
    mobileDevice: String
    readingCount: Int
    readings: [Reading!]
    mode: String
  }

  extend type User {
    patches: [Patch!]!
    patch(id: Int!): Patch
  }

  "Creates a patch."
  input CreatePatchInput {
    bleId: String
    userId: Int
  }

  type CreatePatchPayload {
    "The patch created."
    patch: Patch
  }

  "Updates patch of provided ID."
  input UpdatePatchInput {
    id: Int!
    bleId: String
  }

  type UpdatePatchPayload {
    "The patch updated."
    patch: Patch
  }

  "Creates a reading for a given patch."
  input CreateReadingInput {
    patchId: Int
    patchBleId: ID
    uri: String

    "Commit hash associated with FW build."
    firmwareVersion: String

    "Packet sequence number since device was last powered on. Reset to 0 when device is powered off."
    sequence: Int

    "Number of milliseconds patch has been on."
    uptimeMs: Int

    "Set of tags used to provide additional context to reading."
    tags: [String!]
  }

  type CreateReadingPayload {
    "The patch created."
    reading: Reading
  }

  "Creates a reading for a given patch."
  input SetPatchModeInput {
    patchId: Int
    mode: String
  }

  type SetPatchModePayload {
    id: Int!
    mode: String
  }

  extend type Mutation {
    updatePatch(input: UpdatePatchInput!): UpdatePatchPayload
    createPatch(input: CreatePatchInput!): CreatePatchPayload
    createReading(input: CreateReadingInput!): CreateReadingPayload
    setPatchMode(input: SetPatchModeInput!): SetPatchModePayload
  }

  extend type Query {
    readings(patchId: Int!, start: String): [Reading]
  }
`;
