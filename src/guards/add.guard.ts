//add guard complated

import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {AdminService} from 'src/admin/admin.service';
import {HospitalWardService} from 'src/hospital-ward/hospital-ward.service';

@Injectable()
export class AddGuard implements CanActivate {
    constructor(private readonly jwtService : JwtService, private adminService : AdminService, private wardService : HospitalWardService) {}
    async canActivate(context : ExecutionContext,) {
        try {
            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;
            if (! authHeader) {
                throw new UnauthorizedException({message: "The user is not authorized"})
            }

            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];
            if (bearer !== 'Bearer' || ! token) {
                throw new UnauthorizedException({message: "The user is not authorized"});
            }

            const date = await this.jwtService.verify(token, {publicKey: process.env.ACCESS_TOKEN_KEY});
            const body = req.body
            switch (date.who) {
                case 'ADMIN':
                    const notPermissionToAdmin = ['/diagnosis', '/treatment', '/lobaratory-diagnosis', '/recipe', '/hospital-ward-spec', '/specialist', '/users', '/user-date', '/user-spec-permission',]

                    const admin = await this.adminService.findOne(date.id)
                    if (!admin) {
                        throw new UnauthorizedException({message: "The admin is not authorized"});
                    }

                    switch (admin.permission_id) {
                        case 1:    // super admin
                        case 2:    // creator
                            if (notPermissionToAdmin.includes(req.url))
                                throw new UnauthorizedException({message: "The admin is not authorized"});
                            return true
                            
                        case 3:    // hospital admin
                            switch (req.url) {
                                case '/hospital-ward':
                                case '/lobaratory-diagnosis':
                                    if (body['hospital_id'] == admin.hospital_id) 
                                        return true
                                    break

                                case '/hospital-ward-spec':
                                    const ward = await this.wardService.findByHospital(body['ward_id'], admin.hospital_id)
                                    if (! ward) {
                                        throw new UnauthorizedException({message: "The admin is not authorized"});
                                    }
                            }
                        default:
                            throw new UnauthorizedException({message: "The admin is not authorized"});
                    }
                    break;
                case 'USER':
                case 'SPEC':
                    const permissionToUser = ['/users', '/user-date', '/space-date', '/user-spec-permission']
                    if (permissionToUser.includes(req.url))
                        if (body['user_id'] == date.id) 
                            return true
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
