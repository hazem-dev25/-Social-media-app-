import { GraphQLObjectType, GraphQLString } from "graphql";

export const getAllUsersType = new GraphQLObjectType({
  name: "getAllUsers",
  description: "get all users",
  fields: {
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    role: { type: GraphQLString },
    image: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  },
});



export const getUserByIdType = new GraphQLObjectType({
  name: "getUserById",
  description: "get user by id", 
  fields:{
      userid:{type:GraphQLString}
  }
    })


export const updateUserType = new GraphQLObjectType({
  name: "updateUser",
  description: "update user",
  fields:{name:{type:GraphQLString},
  age:{type:GraphQLString}
}
})

export const deleteUserType = new GraphQLObjectType({
  name: "deleteUser",
  description: "delete user",
  fields:{userid:{type:GraphQLString}}
}
)