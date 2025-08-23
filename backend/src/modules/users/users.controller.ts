import {
  Controller,
  Get,
  Param,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../../common/guards/auth.guard';
import { UserDto, UsersResponseDto } from '../../common/dto/user.dto';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<UsersResponseDto> {
    return this.usersService.findAll();
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  async getCurrentUser(@Request() req): Promise<UserDto> {
    return this.usersService.getCurrentUser(req.user.id);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<UserDto> {
    return this.usersService.findOne(id);
  }
}
