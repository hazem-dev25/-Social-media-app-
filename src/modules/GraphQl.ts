import {
  GraphQLObjectType,
  GraphQLSchema,
} from "graphql";
import userQurey from "../modules/gql/user.schema";

export let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "query",
    description: "query of schema",
    fields: {
      ...userQurey.getAllusers(),
      ...userQurey.getUserById()
    },
  }),
  mutation: new GraphQLObjectType({
    name: "mutation",
    description: "mutation of schema",
    fields: {
    ...userQurey.updateUser(),
    ...userQurey.deleteUser()
    },
  }),
});
