import { Injectable, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users-management/users/user.entity';
import {UsersService} from '../users-management/users/users.service';
// import { userType } from '../users/users.constants'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async register(user: any): Promise<User> {
    const { firstName, lastName, email, password, phone, userType , isActive, city, state, country, properties } = user; 
    const existingUser = await this.userService.findUserByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return this.userService.createUser({
      password: hashedPassword,
      ...user
      // firstName: firstName,
      // lastName: lastName,
      // email: email,
      // phone: phone,
      // userType: userType, 
      // isActive: isActive, 
      // city_id: city,
      // state_id: state,
      // country_id: country,
      // properties_id: [], 
    });
  }



  async validateUser(email: string, password: string): Promise<User | null> {
    // const user = await this.userService.findUserByEmail(email);
    const user = this.userModel.findOne({ email }).exec();
    console.log('validateUser', user);
    if (!user) {
      throw new Error('User Not Found!');
    }
    const passwordMatch = await bcrypt.compare(password, password);
    if (passwordMatch) {
      return user;
    } else {
      throw new Error('Invalid Credentials!');
    }
    // return null;
  }

  async login(user: User): Promise<{ accessToken: string }> {
    const payload = { email: user.email };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
