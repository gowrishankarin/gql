import { MongoDataSource } from "apollo-datasource-mongodb";
import { model, Schema, Types } from "mongoose";

import {
  UpdateResult,
  DeleteResult,
  InsertOneResult,
  ObjectId,
  Filter,
} from "mongodb";
import authenticateGoogle from "../auth/google.auth";

interface UserDocument {
  _id: Types.ObjectId;
  provider: string;
  providerId: string;
  displayName: string;
  familyName: string;
  givenName: string;
  email: string;
  verifiedEmail: string;
  picture: string;
  locale: string;
  hd: string;
}

const UserSchema = new Schema<UserDocument>({
  provider: {
    type: String,
  },
  providerId: {
    type: String,
  },
  displayName: {
    type: String,
  },
  familyName: {
    type: String,
  },
  givenName: {
    type: String,
  },
  email: {
    type: String,
  },
  verifiedEmail: {
    type: String,
  },
  picture: {
    type: String,
  },
  locale: {
    type: String,
  },
  hd: {
    type: String,
  },
});

export const User = model<UserDocument>("User", UserSchema);

class UserAPI extends MongoDataSource<UserDocument> {
  constructor(options) {
    super(options);
    // console.log(options.req);
  }

  async getUserByEmail(email: string): Promise<UserDocument | null> {
    return await this.collection.findOne({ email });
  }

  async create(user): Promise<InsertOneResult<UserDocument | null>> {
    try {
      const result = this.collection.insertOne(user as UserDocument, {
        forceServerObjectId: false,
      });
      return result;
    } catch (error) {
      console.log({ error });
      return error;
    }
  }

  async maybeSignUpGoogle(
    accessToken,
    req,
    res
  ): Promise<InsertOneResult<UserDocument> | UserDocument> {
    req.body = {
      ...req.body,
      access_token: accessToken,
    };

    console.log("Going to call authenticateGoogle");
    // TODO: Get rid of any usage
    const data: any = await authenticateGoogle(req, res);
    console.log("Called authenticateGoogle");

    const email = data._json.email.toLowerCase().replace(/ /gi, "");

    let user = await this.getUserByEmail(email);

    if (!user) {
      let newUser = {
        provider: data.provider,
        providerId: data.id,
        displayName: data.displayName,
        familyName: data._json.family_name,
        givenName: data._json.given_name,
        email: data._json.email,
        verifiedEmail: data._json.verified_email,
        picture: data._json.picture,
        locale: data._json.locale,
        hd: data._json.hd,
      } as UserDocument;

      return await this.create(newUser);
    }

    return user;
  }
}

export default UserAPI;
