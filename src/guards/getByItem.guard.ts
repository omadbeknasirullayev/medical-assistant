import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service';

@Injectable()
export class getByItemGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService, private adminService: AdminService) { }
    async canActivate(
        context: ExecutionContext,
    ) {
        try {
            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                throw new UnauthorizedException({ message: "The user is not authorized" })
            }

            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];
            console.log(req.url)
            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({message: "The user is not authorized"});
            }

            const date = await this.jwtService.verify(token, { publicKey: process.env.ACCESS_TOKEN_KEY });
            switch (date.who) {
                case 'ADMIN':
                    let url = [ '/diagnosis', '/treatment', '/recipe',  '/users', '/users-date']
                    if (!url.includes(req.url)) {
                        const admin = await this.adminService.findOne(date.id)

                        if (!admin) {
                            throw new UnauthorizedException({message: "The user is not authorized"});
                        }

                        switch (admin.permission_id) {
                            case 1:
                            case 2:
                                if (req.url != '/lobaratory-diagnosis' && '/hospital-ward-spec') {
                                    return true
                                }
                               
                            case 3: 
                                if (req.url == '/lobaratory-diagnosis' && date.id == req.body["hospital.id"]) {
                                    return true
                                }
                        }
                    }
                    throw new UnauthorizedException({message: "The user is not authorized"});
                    
                case 'USER':
                case 'SPEC':
                    if (req.url == "users") {
                        if (date.id == req.params.id) {
                            return true
                        }
                    }else if (req.url != "/admin") {
                        if (date.id == req.body["user_id"])
                            return true
                    }
                    throw new UnauthorizedException({message: "The user is not authorized"});
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
