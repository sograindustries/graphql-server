import { Resolvers } from "../generated/graphql";

const resolvers: Resolvers = {
  Query: {
    user: (_, __, { api }) => {
      api.patch.create({
        id: "1234",
        uuid: "1234"
      });
      return {
        id: "1234",
        username: "1234"
      };
    }
  }
};

export default resolvers;
