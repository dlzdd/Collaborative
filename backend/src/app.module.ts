import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { TaskModule } from './task/task.module';

@Module({
  imports: [UserModule, PrismaModule, ConfigModule.forRoot({
    isGlobal: true
  }), TaskModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
