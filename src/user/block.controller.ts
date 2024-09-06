import { Controller, Post, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('block')
export class BlockController {
  constructor(private readonly userService: UserService) {}

  @Post(':userId/block/:blockedUserId')
  async blockUser(
    @Param('userId') userId: string,
    @Param('blockedUserId') blockedUserId: string,
  ) {
    return await this.userService.blockUser(userId, blockedUserId);
  }

  @Delete(':userId/unblock/:blockedUserId')
  async unblockUser(
    @Param('userId') userId: string,
    @Param('blockedUserId') blockedUserId: string,
  ) {
    return await this.userService.unblockUser(userId, blockedUserId);
  }
}
