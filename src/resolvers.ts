import { mergeResolvers } from "merge-graphql-schemas";
import query from "./query/resolvers";
import user from "./user/resolvers";
import patch from "./patch/resolvers";
import viewer from "./viewer/resolvers";
import patient from "./patient/resolvers";
import reading from "./reading/resolvers";
import bpm from "./bpm/resolvers";

export default mergeResolvers([
  query,
  user,
  patch,
  viewer,
  patient,
  reading,
  bpm
]);
