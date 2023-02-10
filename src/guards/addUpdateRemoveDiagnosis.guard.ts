import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import { UserSpecPermissionService } from 'src/user_spec_permission/user_spec_permission.service';

@Injectable()
export class AddDiagnosisGuard implements CanActivate {
    constructor(private readonly jwtService : JwtService, private userSpecPermission: UserSpecPermissionService) {}
    async canActivate(context : ExecutionContext,) {
        try {
            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;
            if (! authHeader) {
                throw new UnauthorizedException({message: "The user is not authorized"})
            }

            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];
            console.log(req.url)
            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({message: "The user is not authorized"});
            }

            const date = await this.jwtService.verify(token, {publicKey: process.env.ACCESS_TOKEN_KEY});
            const body = req.body
            if (date.who == "SPEC") {
                const permissionUrl = ['/diagnosis', '/treatment']
                if (permissionUrl.includes(req.url)) {
                    const specPermission = await this.userSpecPermission.findBySpecId(date.id, body.user_id);
                    if (+specPermission.expire_time > Date.now() ) {
                        switch (specPermission.permission_id) {
                            case 5: 
                            case 6:
                            case 8:
                                return true;
                    }
                    
                }
            }
        }
        throw new UnauthorizedException({message: "The user is not authorized"});
        } catch (error) { 
            throw new HttpException(
                `${error.message}`, 
                HttpStatus.FORBIDDEN
                );
        }
    }
}