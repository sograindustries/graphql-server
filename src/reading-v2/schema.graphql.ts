import gql from "graphql-tag";

export default gql`
  type Reading2 {
    "Unique reading ID."
    id: Int!

    "ID of patch which generated the reading."
    patchId: Int!

    "URI of ECG blob."
    uri: String

    "Commit hash associated with FW build."
    firmwareVersion: String

    "Number of milliseconds patch has been on."
    uptimeMs: Int

    "Packet sequence number since device was last powered on. Reset to 0 when device is powered off."
    sequence: Int

    "Set of tags used to provide additional context to reading."
    tags: [String!]

    "UTC Date and time the reading was created."
    createdAt: String
  }

  "Creates a reading for a given patch."
  input CreateReadingInput2 {
    "ID of patch which generated the reading. May be empty if patchBleId is defined."
    patchId: Int

    "Ble ID which generated reading. May be empty if patchID is defined."
    patchBleId: ID

    "URI of ECG blob."
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

  type CreateReadingPayload2 {
    "The reading created."
    reading: Reading2
  }

  extend type Mutation {
    createReading2(input: CreateReadingInput2): CreateReadingPayload2
  }
`;
