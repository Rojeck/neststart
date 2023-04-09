import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthUserDto } from './dto/authUser.dto';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/registerUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/login')
  async loginUser(@Body() authUserDto: AuthUserDto) {
    return this.authService.login(authUserDto);
  }

  @Post('/register')
  async registerUser(@Body() registerUserDto: RegisterUserDto) {
    console.log(registerUserDto);
    return this.authService.registration(registerUserDto);
  }
}
