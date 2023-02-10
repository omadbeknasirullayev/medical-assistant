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
    constructor(private readonly jwtService: JwtService, private adminService: AdminService,) { }
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
                throw new UnauthorizedException({
                    message: "The user is not authorized",
                });
            }
            const date = await this.jwtService.verify(token, { publicKey: process.env.ACCESS_TOKEN_KEY });
            
            switch (date.who) {
                case 'ADMIN':
                    let url = ['/spec-date', '/admin', '/hospital', '/hospital-ward', '/hospital-ward-spec']
                    if (url.includes(req.url)) {
                        const admin = await this.adminService.findOne(date.id)
                    
                        if (!admin) {
                            throw new UnauthorizedException({
                                message: "The admin is not authorized",
                            });
                        }
                        
                        switch (admin.permission_id) {
                            case 1: 
                            case 2: 
                            case 3: 
                            case 4: 
                                return true
                            }
                        }
                   
        }
        throw new UnauthorizedException({
            message: "The user is not authorized",
        });
        } catch (error) {
            throw new HttpException(
                `${error.message}`, 
                HttpStatus.FORBIDDEN
                );
        }
    }
}
