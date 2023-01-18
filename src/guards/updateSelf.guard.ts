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
    constructor(private readonly jwtService: JwtService, private readonly reflector: Reflector, private adminPermission: AdminPermissionService, private userPermission: UserPermissionService, private specPermission: SpecPermissionService) { }
    async canActivate(
        context: ExecutionContext,
    ) /* boolean | Promise<boolean> | Observable<boolean> */ {
        try {
            // const requiredRoles = this.reflector.getAllAndOverride <string[]> ( Permission, [context.getHandler(), context.getClass()])
            // if (!requiredRoles) {
            //     console.log(requiredRoles)
            //     return true
            // }
            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                throw new UnauthorizedException({ message: "The user is not authorized" })
            }

            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];

            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({
                    message: "The user is not authorized",
                });
            }

            // console.log(token)
            const date = await this.jwtService.verify(token, { publicKey: process.env.ACCESS_TOKEN_KEY });
            let permission = []
            switch (date.who) {
                case 'ADMIN':
                    const admin = await this.adminPermission.findByAdminId(date.id)
                    for (let i of admin) {
                        permission.push(i.dataValues.permission.dataValues.name)
                    }
                    if (permission.includes('super-admin'))
                        return true
                    if (permission.includes('updateSelf')) {
                        if (req.params.id == date.id) {
                            return true
                        }
                    }
                case 'USER':
                    const user = await this.userPermission.findByUserId(date.id)
                    for (let i of user) {
                        permission.push(i.dataValues.permission.dataValues.name)
                    }
                    if (permission.includes('updateSelf')) {
                        if (req.params.id == date.id) {
                            return true
                        }
                    }
                case 'SPEC':
                    const spec = await this.specPermission.findBySpecId(date.id)
                    for (let i of spec) {
                        permission.push(i.dataValues.permission.dataValues.name)
                    }
                    if (permission.includes('updateSelf')) {
                        if (req.params.id == date.id) {
                            return true
                        }
                    }
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
