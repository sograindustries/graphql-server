import { Resolvers } from "../generated/graphql";

const resolvers: Resolvers = {
  Query: {
    viewer: (_, __, { auth }) => {
      console.log("AUTH: ", auth);
      if (!auth) {
        return null;
      }
      return {
        username: "will@argosindustries.com",
        id: "will@argosindustries.com"
      };
    }
  }
};

export default resolvers;
