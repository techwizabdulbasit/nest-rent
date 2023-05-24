import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
      ) {}

      async getAllUsers(): Promise<User | any> {
        const users = await this.userModel.find().exec();
        // return users.map((user) => user.toObject({ getters: true })) as User[];
     }

      async findUserByEmail(email: string): Promise<User | null> {
        console.log('email', email)
         const user = this.userModel.findOne({ email }).exec();
         return user;
      }

    //   async getUserDetails(id: string): Promise<User | null> {
    //     return this.userModel.findById({ id }).exec();
    //   }

      async createUser(user: User): Promise<User> {
        const createdUser = new this.userModel(user);
        return createdUser.save();
      }

      async updateUser(id: string, user: User): Promise<User | null> {
        const updatedUser = await this.userModel.findByIdAndUpdate(id, user, { new: true });
        return updatedUser;
      }

      async deleteUser(id: string): Promise<User | null> {
        const deletedUser = await this.userModel.findByIdAndDelete(id);
        return deletedUser;
      }
      
}
