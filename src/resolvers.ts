import { mergeResolvers } from "merge-graphql-schemas";
import query from "./query/resolvers";
import user from "./user/resolvers";
import patch from "./patch/resolvers";
import viewer from "./viewer/resolvers";

export default mergeResolvers([query, user, patch, viewer]);
