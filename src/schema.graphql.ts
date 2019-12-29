import { mergeTypes } from "merge-graphql-schemas";
import query from "./query/schema.graphql";
import user from "./user/schema.graphql";
import patch from "./patch/schema.graphql";
import viewer from "./viewer/schema.graphql";
import patient from "./patient/schema.graphql";
import reading from "./reading/schema.graphql";
import bpm from "./bpm/schema.graphql";

export default mergeTypes([query, user, patch, viewer, patient, reading, bpm]);
