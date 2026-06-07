import { GraphQLNonNull, GraphQLString } from "graphql";

export const argsUserById = {
    userid:{type: new GraphQLNonNull(GraphQLString)}
}

export const argsUpdateUser = {
    userid:{type: new GraphQLNonNull(GraphQLString)},
    name:{type: new GraphQLNonNull(GraphQLString)},
    age:{type: new GraphQLNonNull(GraphQLString)}
}

export const argsDeleteUser = {
    userid:{type: new GraphQLNonNull(GraphQLString)}
}