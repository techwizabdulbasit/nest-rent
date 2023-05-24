import { Controller, Post, Body, Get, Param, Delete, Put, Query, ParseEnumPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './user.dto';
// import { userType } from './users.constants'
 
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    
  @Get()
  async getAllUsers(){
    const users = await this.userService.getAllUsers();
    return users;  
  }

  @Get('find')
  async findUserByEmail(@Query('email') email: string){
    const userByEmail = await this.userService.findUserByEmail(email);
    return userByEmail;
  }

//   @Get(':id')
//   async getUserDetails(@Param('id') id :string){
//     const userDetails = await this.userService.getUserDetails(id);
//     return userDetails;
//   }

  // @Post()
  // async createUser(@Body() user: User) {
  //   const createdUser = await this.userService.createUser(user);
  //   return createdUser;
  // }

  @Post()
  async createUser(@Body() user: User) {
    const createdUser = await this.userService.createUser(user);
    return createdUser;
  }

  @Put(':id')
  async updateUser(@Param('id') id :string, @Body() user: User){
    const updatedUser = await this.userService.updateUser(id, user);
    return updatedUser;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id :string){
    await this.userService.deleteUser(id);
  }


}
