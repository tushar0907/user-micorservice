import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { BlockModule } from './user/block.module';
import { UserSchema } from './user/user.schema';

@Module({
  imports: [
    CacheModule.register(), // Enables caching
    MongooseModule.forRoot(
      'mongodb+srv://tussharkumar2705:nSrSvZfZBDKoqJf1@trail.hvvf8.mongodb.net/Trial',
    ), // Adjust the URL for your DB
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    UserModule,
    BlockModule,
  ],
})
export class AppModule {}
