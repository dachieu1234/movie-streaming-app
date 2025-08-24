
import { Controller, Post, Body } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/auth.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("login")
    @ApiBody({ type: LoginDto })
    async login(@Body() body: LoginDto) {
        const user = await this.authService.validate(body.username, body.password);
        return this.authService.login(user);
    }
}
