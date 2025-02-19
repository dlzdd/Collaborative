import { Module } from '@nestjs/common';
import { UserController } from './auth.controller';
import { UserService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({}),],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
