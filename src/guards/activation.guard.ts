import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { AdminPermissionService } from 'src/admin_permission/admin_permission.service';
import { SpecPermissionService } from 'src/spec_permission/spec_permission.service';
import { UserPermissionService } from 'src/user_permission/user_permission.service';

@Injectable()
export class getByItemGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService, private adminPermission: AdminPermissionService,) { }
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
            let permission = []
            switch (date.who) {
                case 'ADMIN':
                    const admin = await this.adminPermission.findByAdminId(date.id)
                    if (!admin) {
                        throw new UnauthorizedException({
                            message: "The admin is not authorized",
                        });
                    }

                    for (let i of admin) {
                        permission.push(i.dataValues.permission.dataValues.name)
                    }
                    if (permission.includes('super-admin'))
                        return true
                    if (permission.includes('activation')) {
                        return true
                    }

                    throw new UnauthorizedException({
                        message: "The admin is not authorized",
                    });
                case 'USER':
                    throw new UnauthorizedException({
                        message: "The user is not authorized",
                    });
                case 'SPEC':
                    throw new UnauthorizedException({
                        message: "The spec is not authorized",
                    });
            }
            return false


        } catch (error) {
            console.log(error)
            throw new HttpException(
                'Ruxsat etilmagan foydalanuvchi',
                HttpStatus.FORBIDDEN
            );
        }
    }
}
