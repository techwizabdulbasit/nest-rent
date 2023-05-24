// auth.controller.ts
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
// import { LoginDto } from './dto/login.dto';
import { User } from '../users-management/users/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('register')
  async register(@Body()  User: any): Promise<{ accessToken: string }> {
    const user = await this.authService.register(User);
    return this.authService.login(user);
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Body() User: any): Promise<{ accessToken: string }> {
    console.log(User);
    const user = await this.authService.validateUser(
        User.email,
        User.password,
    );
    console.log('auth cont',user)
    return this.authService.login(user);
  }

}
