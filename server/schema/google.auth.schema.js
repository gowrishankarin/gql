import getGoogleProfile from "../auth/google.profile";
import { authentiateGoogle } from "../auth/google.auth"
import { aggregate } from "../models/Project";
import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";

export const typeDefs = `
  type User {
    id: ID!,
    name: String!,
    email: String!,
    password: String!
  }

  type AuthResponse {
    accessToken: String!,
    refreshToken: String!,
  }

  type Mutation {
    signUpGoogle(accessToken: String!): AuthResponse
  }
`;


const googleAuthResolvers = {
  Mutation: {
    signUpGoogle: async (_, { accessToken }, ctx) => {
      const { models, req, res } = ctx;
      const { User } = models; 

      req.body = {
        ...req.body,
        access_token: aggregate.accessToken,
      };

      try {
        const { data, info } = await authentiateGoogle(req, res); 
        const profile = await getGoogleProfile(accessToken);

        

        if (info) {
          switch (info.code) {
            case 'ETIMEOUT':
              throw new Error('Failed to reach Google: Try again'); 
            default:
              throw new Error('Something went wrong');
            
          }
        } 

        const { _json } = data.profile; 
        const { email } = _json;
        const firstName = _json.given_name;
        const lastName = _json.family_name;

        let accessToken = '';
        let refreshToken = '';
        let message = '';

        const userExist = await User.findOne({
          where: {
            email: email.toLowerCase().replace(/ /gi, '')
          }
        });

        if (!userExist) {
          const newUser = await User.create({
            email: email.toLowerCase().replace(/ /gi, ''),
            firstName,
            lastName,
          });
          accessToken = await generateToken(newUser.dataValues.id);
          refreshToken = await generateToken(newUser.dataValues.id, true);

          return {
            message, accessToken: `Bearer ${accessToken}`,
            refreshToken: `Bearer ${refreshToken}`
          };
        }
        accessToken = await generateToken(newUser.dataValues.id);
        refreshToken = await generateToken(newUser.dataValues.id, true);

        return {
          message, accessToken: `Bearer ${accessToken}`,
          refreshToken: `Bearer ${refreshToken}`
        };
      } catch (error) {
        return error;
      }
    } 
  }
}