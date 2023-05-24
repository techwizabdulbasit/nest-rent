import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users-management/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users-management/users/user.entity';


import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

import * as dotenv from 'dotenv'
dotenv.config()


@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),],
  providers: [AuthService, UsersService, JwtService, JwtStrategy, LocalStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
