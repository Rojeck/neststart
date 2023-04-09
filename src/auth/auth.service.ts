import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/core/prisma.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { User } from '@prisma/client';
import { AuthUserDto } from './dto/authUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async registration(registerDto: RegisterUserDto) {
    const { email, password } = registerDto;
    const user = await this.validateUser(email);
    if (user) {
      throw new HttpException('User exists', HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = await bcrypt.hash(password, 3);
    const generatedUser = await this.userService.createUser({
      ...registerDto,
      password: hashedPassword,
    });
    return this.generateToken(generatedUser);
  }

  async login(authUserDto: AuthUserDto) {
    const user = await this.validateUser(authUserDto.email);
    if (!user) {
      throw new HttpException('user does not exist', HttpStatus.BAD_REQUEST);
    }
    const passEqual = await bcrypt.compare(authUserDto.password, user.password);
    if (!passEqual) {
      throw new UnauthorizedException({ massage: 'wrond password' });
    }
    return this.generateToken(user);
  }

  private generateToken(user: User) {
    const payload = { email: user.email, id: user.id, name: user.name };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });
    return user;
  }
}
