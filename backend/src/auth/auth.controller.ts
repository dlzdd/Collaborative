import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthDto } from './dto/UserDto';
import { UserService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class UserController {
    constructor(private userService: UserService) {}
    @Post('signUp')
    async signUp(@Body() dto: AuthDto){
        return this.userService.signUp(dto)
    }
    // @UseGuards(AuthGuard)
    @Post('signIn') 
    async signIn(@Body() dto: AuthDto) {
        return this.userService.signIn(dto)
    }
}
