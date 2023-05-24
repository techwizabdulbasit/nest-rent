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

const DB_String_Cloud="mongodb+srv://wizardtechab:abdul@cluster0.egx68uh.mongodb.net/rentzo?retryWrites=true&w=majority";
const DB_String_Local="mongodb://localhost/rentzo";

@Module({
  imports: [MongooseModule.forRoot(DB_String_Cloud), AuthModule, JwtModule, UsersManagementModule, PropertiesManagementModule, ImportDataModule, MulterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
