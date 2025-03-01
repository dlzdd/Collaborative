import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/UserDto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signUp(dto: AuthDto) {
    // 检查邮箱是否已经存在
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ForbiddenException('该邮箱已被注册');
    }
    const hash = await argon2.hash(dto.password);
    return this.prisma.user.create({
      data: {
        email: dto.email,
        password: dto.password,
        hash: hash,
      },
    });
  }
  async signIn(dto: AuthDto) {
    const user = this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('用户不存在');
    }
    // 校验用户hash值
    const pwMatches = await argon2.verify((await user).hash, dto.password);
    if (!pwMatches) {
      throw new ForbiddenException('密码错误');
    }
    return this.signToken(dto); // 返回登录成功的消息
  }
  async signToken(dto: AuthDto) {
    const payload = {
      sub: dto.email,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = this.jwt.sign(payload, {
      secret,
      expiresIn: '1h',
    });
    return {
      access_token: token,
    };
  }
}
