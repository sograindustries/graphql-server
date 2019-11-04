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
  }

  extend type Patch {
    battery: Battery
    batteryActivity: [Battery!]
    firmwareVersion: String
    appVersion: String
    mobileDevice: String

    readingCount: Int
    readings: [Reading!]
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
  }

  type CreateReadingPayload {
    "The patch created."
    reading: Reading
  }

  extend type Mutation {
    updatePatch(input: UpdatePatchInput!): UpdatePatchPayload
    createPatch(input: CreatePatchInput!): CreatePatchPayload
    createReading(input: CreateReadingInput!): CreateReadingPayload
  }
`;
