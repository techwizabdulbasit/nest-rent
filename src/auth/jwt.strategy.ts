import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { UsersService } from '../users-management/users/users.service';
import { User } from '../users-management/users/user.entity';

import * as dotenv from 'dotenv'
dotenv.config()


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // secretOrKey: process.env.JWT_SECRET,
      secretOrKey: 'secret',
    });
  }

  // async validate(payload: any): Promise<User> {
  //   const { email: emailId } = payload;
  //   const user = await this.userService.findUserByEmail(emailId);
  //   if (!user) {
  //     throw new Error('User not found');
  //   }
  //   return user;
  // }

    // async validate(email: string, password: string): Promise<User | null> {
    // const user = await this.userService.findUserByEmail(email);
    // console.log(user);
    // if (!user) {
    //       throw new Error('User not found');
    //     }
    // return user;


    // if (!user) {
    //   return null;
    // }
    // const passwordMatch = await bcrypt.compare(password, user.password);
    // if (passwordMatch) {
    //   return user;
    // }
    // return null;
  // }

}
