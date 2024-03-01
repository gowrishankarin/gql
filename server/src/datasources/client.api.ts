import { MongoDataSource  } from "apollo-datasource-mongodb";
import {
  UpdateResult,
  DeleteResult,
  InsertOneResult,
  ObjectId,
  Filter,
} from "mongodb";
import { model, Schema, Types } from 'mongoose';


interface ClientDocument {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
}

const ClientSchema = new Schema<ClientDocument>({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
});

const Client = model<ClientDocument>('Client', ClientSchema);

class ClientAPI extends MongoDataSource<ClientDocument> {
  constructor(options) {
    super(options);
  }

  getClient(clientId: string): Promise<ClientDocument | null>  {
    const client = this.findOneById(clientId);
    return client;
  }

  async findAll(): Promise<ClientDocument[]> {
    const clientsCursor = this.collection.find({});
    return await clientsCursor.toArray()
  }

  async create({ name, email, phone }): Promise<InsertOneResult<ClientDocument | null>> {
    try {
      const result = await this.collection.insertOne({ name, email, phone} as ClientDocument, {
        forceServerObjectId: false,
      });
      return result;
    } catch (err) {
      return err;
    }
  }

  update({ id, name, email, phone }): Promise<UpdateResult<ClientDocument | null>> {
    const result = this.collection.updateOne({ "_id": id }, {
      $set: {
        name,
        email,
        phone,
      },
    });

    console.log({result})
    return result;
  }

  async delete(id: string): Promise<DeleteResult | null> {
    const filter: Filter<ClientDocument> = { "_id": new ObjectId(id) };
    const result = await this.collection.deleteOne(filter);
    return result;
  }
}

export default ClientAPI;
