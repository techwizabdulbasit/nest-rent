import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

import { UsersManagementModule } from './users-management/users-management.module';
import { PropertiesManagementModule } from './properties-management/properties-management.module';

// import { CsvModule } from 'nest-csv-parser'
import { ImportDataModule } from './import-data/import-data.module';
import { MulterModule } from '@nestjs/platform-express';

import * as dotenv from 'dotenv'
dotenv.config()


@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/rentzo'), AuthModule, JwtModule, UsersManagementModule, PropertiesManagementModule, ImportDataModule, MulterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
