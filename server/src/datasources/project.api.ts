import { MongoDataSource } from 'apollo-datasource-mongodb';
import { model, Schema, Types } from 'mongoose';

import {
  UpdateResult,
  DeleteResult,
  InsertOneResult,
  ObjectId,
  Filter,
} from "mongodb";

interface ProjectDocument {
  _id: ObjectId;
  name: string;
  description: string;
  status: string;
  clientId: ObjectId;
}

const ProjectSchema = new Schema<ProjectDocument>({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
  },
  clientId: {
    type: ObjectId,
    ref: "Client",
  },
});

const Project = model<ProjectDocument>("Project", ProjectSchema);

class ProjectAPI extends MongoDataSource<ProjectDocument> {
  constructor(options) {
    super(options);
  }
  getProject(projectId: string): Promise<ProjectDocument | null> {
    return this.findOneById(projectId);
  }

  async findAll(): Promise<ProjectDocument[]> {
    const projectsCursor = this.collection.find({});
    return await projectsCursor.toArray();
  }

  async create({
    name,
    description,
    status,
    clientId,
  }): Promise<InsertOneResult<ProjectDocument | null>> {
    try {
      // const project = new Project({ name, description, status, clientId });
      const result = this.collection.insertOne(
        { name, description, status, clientId } as ProjectDocument,
        {
          forceServerObjectId: false,
        }
      );
      return result;
    } catch (error) {
      console.log({ error });
      return error;
    }
  }

  async update({
    id,
    name,
    description,
    status,
  }): Promise<UpdateResult<ProjectDocument>> {
    const result = await this.collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name: name,
          description: description,
          status: status,
        },
      }
    );

    return result;
  }

  async delete(id: string): Promise<DeleteResult | null> {
    const filter: Filter<ProjectDocument> = { _id: new ObjectId(id) };
    const result = this.collection.deleteOne(filter);

    return result;
  }
}

export default ProjectAPI;
