import { GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLUnionType } from "graphql";
import { userModel } from "../../database/models/user.model";
import { NotFoundException } from "../../common/exception/application.exception";
import { Express} from "express";
import express from 'express'
import { createHandler } from "graphql-http/lib/use/express";



let schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'query',
        description: 'query of schema' ,
        fields: {
            getUserById: {
                type: new GraphQLObjectType({
                    name: 'getUserById',
                    fields:{userid: {type: GraphQLString}}
                }) ,
                args: {userid: {type: new GraphQLNonNull(GraphQLString)}} ,
                
                resolve:async (_,args)=>{
                    let user = await userModel.findById(args.userid)
                    if(!user){
                        throw new NotFoundException('the user is not found')
                    }
                    return user
                }
                
            }
        }
    })
})

const app : Express = express()

app.use('/qraphql', createHandler({schema}))