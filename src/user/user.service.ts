import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(userDto: any): Promise<User> {
    const createdUser = new this.userModel(userDto);
    return await createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findByUsername(username: string): Promise<User> {
    return await this.userModel.findOne({ username }).exec();
  }

  async findByAgeRange(minAge?: number, maxAge?: number): Promise<User[]> {
    const now = new Date();
    const minDate = minAge
      ? new Date(now.getFullYear() - minAge, now.getMonth(), now.getDate())
      : undefined;
    const maxDate = maxAge
      ? new Date(now.getFullYear() - maxAge, now.getMonth(), now.getDate())
      : undefined;

    return await this.userModel
      .find({
        birthdate: {
          ...(minDate && { $gte: minDate }),
          ...(maxDate && { $lte: maxDate }),
        },
      })
      .exec();
  }

  async blockUser(userId: string, blockedUserId: string): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) throw new NotFoundException('User not found');

    if (!user.blockedBy.includes(blockedUserId)) {
      user.blockedBy.push(blockedUserId);
      await user.save();
    }

    return user;
  }

  async unblockUser(userId: string, blockedUserId: string): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) throw new NotFoundException('User not found');

    user.blockedBy = user.blockedBy.filter((id) => id !== blockedUserId);
    await user.save();

    return user;
  }
}
