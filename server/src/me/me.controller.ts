import {
  Controller,
  Headers,
  Post,
  Body,
  ValidationPipe,
  Get,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { MeService } from './me.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAccessAuthGuard } from '../auth/jwt/jwt-access.guard';
import { User } from '../entities/user.entity';
import { GetUser } from '../common/decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class MeController {
  constructor(private readonly meService: MeService) {}
  @Post('signup')
  async signUp(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<any> {
    return this.meService.signUp(createUserDto);
  }

  @UseGuards(JwtAccessAuthGuard)
  @Get('me')
  async getMyInfo(@GetUser() user: User): Promise<User> {
    return user;
  }

  @UseGuards(JwtAccessAuthGuard)
  @Patch('me')
  async updateMyInfo(
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
    @GetUser()
    user: User,
  ): Promise<void> {
    await this.meService.updateMyInfo(user, updateUserDto);
  }
}
